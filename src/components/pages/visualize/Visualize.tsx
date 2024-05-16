/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
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
import Task from "../../../lib/model/displayModels/tasks";
import { useApi } from "../../../lib/hooks/useApi";
import ProcessInfo from "../../../lib/model/displayModels/processInfo";
import ProcessDefinitionDataApi from "../../../lib/model/api/processDefinitionData";
import Variable from "../../../lib/model/api/variable";
import FlowElements from "../../../lib/model/displayModels/flowElements";
import HistoryActivity from "./History";

import HistoricActivity from "../../../lib/model/api/historicActivity";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";

import UserCredentials from "../../../lib/model/displayModels/userCredentials";
import HistoryActivitiesGrouped from "../../../lib/model/displayModels/historyActivitiesGrouped";

const Visualize = () => {
  const { id, processDefinitionId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [processInstance, setProcessInstance] = useState<ProcessInfo>(
    {} as ProcessInfo
  );
  const [context, setContext] = useState<Variable>({
    name: "Nom de la variable",
    type: "Type de la variable",
    value: '{"Value": "Valeur de la variable"}',
  } as Variable);

  const [bpmnElements, setBpmnElements] = useState<FlowElements[]>(
    []
  );
  const [processDefinitionData, setProcessDefinitionData] =
    useState<ProcessDefinitionDataApi>({} as ProcessDefinitionDataApi);

  const [history, setHistory] = useState<HistoryActivitiesGrouped[]>([] as HistoryActivitiesGrouped[]);

  const api = useApi();
  const viewer = new NavigatedViewer({
    additionalModules: [minimapModule],
  });
  const [userActions, setUserActions] = useState<UserCredentials[]>([]);

  useQueries({
    queries: [
      {
        queryKey: ["executionActivity", processDefinitionId],
        queryFn: async () => {
          return await api.getExecutionActivities(id).then((res: any) => {
            //console.log("executionActivity", res);
            const overlays = (viewer as any).get("overlays");
            res.forEach((element: any) => {
              overlays.add(element, "note", {
                position: {
                  bottom: 18,
                  right: 18,
                },
                scale: {
                  min: 1.2,
                },
                html: `<div class="diagram-note">🦊</div>`,
              });
            });
            return res;
          });
        },
      },
      {
        queryKey: ["history", id],
        queryFn: async () => {
          return await api
            .getHistoricActivity(id)
            .then((res: HistoricActivity[]) => {
              const dataTable = HistoryActivitiesGrouped.convertToGrouped(res);
              setHistory(dataTable);
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
            //console.log("Got a diagram ");
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
        queryKey: ["processInstance", id],
        queryFn: async () => {
          //console.log("fetching processInstance of id: ", id);
          return await api.getProcessInstanceById(id).then((res: any) => {
            //console.log("processQuery result: ", res);
            setProcessInstance({
              id: res.id,
              businessKey: res.businessKey,
              processKey: res.processDefinitionName,
              documentation: res.processDefinitionDescription,
              startDate: new Date(res.startTime),
              state: true,
              group: "",
              ids: {
                id: res.id,
                processDefinitionId: res.processDefinitionId,
              },
            } as ProcessInfo);

            //setProcesses(res);
            return res;
          });
        },
      },
      {
        queryKey: ["variables", id],
        queryFn: async () => {
          return await api.getHistoricVariablesInstances(id).then((res: any) => {
            const context = res.find((element: Variable) => element.name === "context");
            //console.log("context: ", context);
            setContext(context);
            const variables: Variable[] = [];
            res.forEach((element: Variable) => {
              if (element.name !== "context") {
                variables.push(element);
              }
            });
            //setOtherVariables(variables);
            return res;
          });
        },
      },
      {
        queryKey: ["bpmnElements", processDefinitionId],
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: async () => {
          return await api
            .getBpmnElements(processDefinitionId)
            .then((res: FlowElements[]) => {
              setBpmnElements(res);
              return res;
            });
        },
      },
      {
        queryKey: ["userActions", id],
        queryFn: async () => {
          return await api.getHistoryUserActions(id).then((res: UserCredentials[]) => {
            setUserActions(res);
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
          {
            label: "Contexte",
            iconId: "fr-icon-article-line",
            content: <Variables variables={context} />,
          },
          // {
          //   label: "Autres Variables",
          //   iconId: "fr-icon-article-line",
          //   content: <OtherVariable variables={otherVariables} />,
          // },
          {
            label: "Tâches (Description)",
            iconId: "fr-icon-terminal-box-line",
            content: (
              <Tasks
                bpmnElements={bpmnElements!}
                processName={processInstance.processKey}
              />
            ),
          },
          {
            label: "Actions utilisateur",
            iconId: "fr-icon-user-line",
            content: <TasksManual userActions={userActions} tasks={tasks} />,
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
export default Visualize;
