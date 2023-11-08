/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, ReactNode } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
// eslint-disable-next-line import/extensions
import BpmnJS from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
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

const Visualize = () => {
  const { id, processDefinitionId } = useParams();
  const [rendered, setRendered] = useState<boolean>(false);
  const [diagram, setDiagram] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  // @ts-expect-error BpmnJS is not typed
  const bpmnViewerRef = useRef<BpmnJS>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [processInstance, setProcessInstance] = useState<ProcessInfo>(
    {} as ProcessInfo
  );
  const [variables, setVariables] = useState<Variable>();
  const [bpmnElements, setBpmnElements] = useState<ReactNode[][]>();
  const [processDefinitionData, setProcessDefinitionData] =
    useState<ProcessDefinitionDataApi>({} as ProcessDefinitionDataApi);

  const [history, setHistory] = useState<ReactNode[][]>();

  const api = useApi();

  useQueries({
    queries: [
      {
        queryKey: ["bpmnXml", processDefinitionId],
        queryFn: () => {
          console.log("fetching bpmnXml...");
          return api.getBpmnXml(processDefinitionId).then((res: string) => {
            setDiagram(res);
            const container = containerRef.current;

            bpmnViewerRef.current = new BpmnJS({
              container,
              additionalModules: [minimapModule],
            });

            console.log("Importing diagram...");
            console.log("Diagram: ", res);

            //setDiagram(bpmnQuery.data);
            try {
              bpmnViewerRef.current?.importXML(res).then(() => {
                console.log("Diagram imported");

                // const overlays = bpmnViewerRef.current?.get("overlays");
                // overlays.add(currentActiveTask, "note", {
                //   position: {
                //     bottom: 18,
                //     right: 18,
                //   },
                //   scale: {
                //     min: 1.2,
                //   },
                //   html: '<div class="diagram-note">🦊</div>',
                // });g
                // TEMP
                bpmnViewerRef.current?.get("canvas").resized();
                setRendered(true);
                bpmnViewerRef.current.on("import.done", () => {
                  bpmnViewerRef.current.get("canvas").zoom("fit-viewport");
                });
              });
            } catch (error) {
              console.error("Error importing diagram", error);
              bpmnViewerRef.current?.importXML("").then(() => {
                bpmnViewerRef.current.get("canvas").zoom("fit-viewport");
                setRendered(true);
              });
            }
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
              documentation: "",
              startDate: new Date(res.startTime),
              state: true,
              group: "",
              ids: {
                id: res.id,
                processDefinitionId: res.processDefinitionId,
              },
            });

            //setProcesses(res);
            return res;
          });
        },
      },
      {
        queryKey: ["variables", id],
        queryFn: async () => {
          //console.log("fetching variables of id: ", id);
          return await api.getVariables(id).then((res: any) => {
            //console.log("variables result: ", res);
            setVariables(res);
            return res;
          });
        },
      },
      {
        queryKey: ["bpmnElements", processDefinitionId],
        refetchOnWindowFocus: false,
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
      {
        queryKey: ["history", id],
        queryFn: async () => {
          //console.log("fetching history of id: ", id);
          return await api
            .getHistoricActivity(id)
            .then((res: HistoricActivity[]) => {
              //console.log("history result: ", res);
              const historicActivity: ReactNode[][] = [];
              res.forEach((element: HistoricActivity) => {
                //console.log("element: ", element);
                historicActivity.push([
                  //element.id,
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
    ],
  });

  useEffect(() => {
    document.getElementById("containerBPMN")?.focus();
  }, [rendered]);

  if (diagram.length > 0 && rendered === true && bpmnElements && history) {
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
          id="containerBPMN"
          ref={containerRef}
          style={{ width: "100%", height: "450px" }}
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
              content: <Variables variables={variables!} />,
            },
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
              label: "Tâches manuelles",
              iconId: "fr-icon-user-line",
              content: <TasksManual tasks={tasks} />,
            },
            {
              label: "Historique",
              iconId: "fr-icon-success-line",
              content: <HistoryActivity history={history} />,
            },
          ]}
        />
      </Stack>
    );
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack spacing={2} direction="row" sx={{ padding: "2rem" }}>
        <CircularProgress />
        <Typography variant="h2">Chargement des données...</Typography>
      </Stack>
    </Box>
  );
};
export default Visualize;
