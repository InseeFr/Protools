/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ReactNode } from "react";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import GeneralInfo from "./GeneralInfo";
import Variables from "./Variables";
import Tasks from "./Tasks";
import TasksManual from "./TasksManual";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import minimapModule from "diagram-js-minimap";
import Task from "../../../lib/model/tasks";
import { useApi } from "../../../lib/hooks/useApi";
import ProcessInfo from "../../../lib/model/processInfo";
import ProcessDefinitionDataApi from "../../../lib/model/api/processDefinitionData";
import Variable from "../../../lib/model/api/variable";
import FlowElements from "../../../lib/model/flowElements";
import HistoryActivity from "./History";
import moment from "moment";
import HistoricActivity from "../../../lib/model/api/historicActivity";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";

const VisualizeHistory = () => {
  const { id, processDefinitionId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [processInstance, setProcessInstance] = useState<HistoryProcess>(
    {} as HistoryProcess
  );
  const [bpmnElements, setBpmnElements] = useState<ReactNode[][]>(
    [] as ReactNode[][]
  );
  const [processDefinitionData, setProcessDefinitionData] =
    useState<ProcessDefinitionDataApi>({} as ProcessDefinitionDataApi);

  const [history, setHistory] = useState<ReactNode[][]>([] as ReactNode[][]);

  const api = useApi();
  const viewer = new NavigatedViewer({
    additionalModules: [minimapModule],
  });

  useQueries({
    queries: [
      {
        queryKey: ["history", id],
        queryFn: async () => {
          return await api
            .getHistoricActivity(id)
            .then((res: HistoricActivity[]) => {
              const historicActivity: ReactNode[][] = [];
              res.forEach((element: HistoricActivity) => {
                historicActivity.push([
                  element.activityId,
                  element.activityName,
                  element.activityType,
                  moment(element.endTime).format("DD/MM/YYYY HH:mm"),
                  element.durationInMillis,
                ]);
              });
              setHistory(historicActivity);
              return res;
            });
        },
      },
      {
        queryKey: ["getProcessDefinitionById", processDefinitionId],
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: async () => {
          //console.log("fetching getProcessDefinitionById...");
          return await api
            .getProcessDefinitionById(processDefinitionId)
            .then((res: any) => {
              //console.log("getProcessDefinitionByIds result: ", res);
              setProcessDefinitionData(res);
              return res;
            });
        },
      },
      {
        queryKey: ["bpmnXml", processDefinitionId],
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: () => {
          //console.log("fetching bpmnXml...");
          return api.getBpmnXml(processDefinitionId).then((res: string) => {
            //console.log("Got a diagram : ", res);
            viewer
              .importXML(res)
              .then(() => {
                //console.log("diagram loaded");
                const canvasElement = document.querySelector(
                  "#canvas"
                ) as HTMLElement;
                viewer.attachTo(canvasElement);
                (viewer as any).get("canvas").zoom("fit-viewport");
              })
              .catch((err: any) => {
                console.log("error", err);
              });
            return res;
          });
        },
      },
      {
        queryKey: ["tasks", id],
        queryFn: async () => {
          //console.log("fetching tasks...");
          return await api.getAllTasks(id).then((res: Task[]) => {
            setTasks(res);
            return res;
          });
        },
      },
      {
        queryKey: ["processInstance", id],
        queryFn: async () => {
          return await api.getHistoryProcessInstance(id).then((res: any) => {
            setProcessInstance(res);
            //setVariables(res.variables);

            //setProcesses(res);
            return res;
          });
        },
      },
      {
        queryKey: ["bpmnElements", processDefinitionId],
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: async () => {
          //console.log("fetching bpmnElement of id: ", id);
          return await api
            .getBpmnElements(processDefinitionId)
            .then((res: FlowElements[]) => {
              //console.log("bpmnElement raw: ", res);
              const bpmnElements: ReactNode[][] = [];
              res.forEach((element: FlowElements) => {
                //console.log("element: ", element);
                bpmnElements.push([
                  element.id,
                  element.name,
                  element.eventDefinitions.length > 0 ? "Event" : "Tâche",
                  element.documentation,
                ]);
              });
              setBpmnElements(bpmnElements);
              return res;
            });
        },
      },
    ],
  });

  return (
    <Stack
      spacing={2}
      sx={{
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="canvas"
        style={{
          width: "100%",
          height: "450px",
          marginBottom: "2rem",
        }}
      />
      <Tabs
        style={{ width: "120%" }}
        tabs={[
          {
            label: "Description",
            iconId: "fr-icon-window-line",
            content: (
              <GeneralInfo
                processDefinitionData={processDefinitionData}
                processInstance={processInstance}
              />
            ),
          },
          // {
          //   label: "Contexte",
          //   iconId: "fr-icon-article-line",
          //   content: <Variables variables={variables} />,
          // },
          {
            label: "Tâches (Description)",
            iconId: "fr-icon-terminal-box-line",
            content: (
              <Tasks
                bpmnElements={bpmnElements!}
                processName={processInstance.processDefinitionName}
              />
            ),
          },
          {
            label: "Historique",
            iconId: "fr-icon-success-line",
            content: <HistoryActivity history={history ? history : []} />,
          },
        ]}
      />
    </Stack>
  );
};
export default VisualizeHistory;
