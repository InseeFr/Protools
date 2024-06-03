/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { Stack } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/diagram-js.css";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";
import minimapModule from "diagram-js-minimap";
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import { useParams } from "react-router-dom";
import { useApi } from "../../../lib/hooks/useApi";
import HistoricActivity from "../../../lib/model/api/historicActivity";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";
import ProcessDefinitionDataApi from "../../../lib/model/api/processDefinitionData";
import Variable from "../../../lib/model/api/variable";
//import Task from "../../../lib/model/tasks";
import GeneralInfo from "./GeneralInfo";
import HistoryActivity from "./History";
import Tasks from "./Tasks";
import Variables from "./Variables";
import UserCredentials from "../../../lib/model/displayModels/userCredentials";
import TasksManual from "./TasksManual";
import HistoryActivitiesGrouped from "../../../lib/model/displayModels/historyActivitiesGrouped";
import TasksBpmnElements from "../../../lib/model/displayModels/tasksBpmnElements";


const VisualizeHistory = () => {
  const { id, processDefinitionId } = useParams();
  //const [tasks, setTasks] = useState<Task[]>([]);
  const [processInstance, setProcessInstance] = useState<HistoryProcess>(
    {} as HistoryProcess
  );
  // const [bpmnElements, setBpmnElements] = useState<FlowElements[]>(
  //   []);
  const [processDefinitionData, setProcessDefinitionData] =
    useState<ProcessDefinitionDataApi>({} as ProcessDefinitionDataApi);

  const [history, setHistory] = useState<HistoryActivitiesGrouped[]>([] as HistoryActivitiesGrouped[]);
  const [model, setModel] = useState<TasksBpmnElements[]>([]);
  const api = useApi();
  const viewer = new NavigatedViewer({
    additionalModules: [minimapModule],
  });

  const [context, setContext] = useState<Variable>({
    name: "Nom de la variable",
    type: "Type de la variable",
    value: '{"Value": "Valeur de la variable"}',
  } as Variable);



  const [userActions, setUserActions] = useState<UserCredentials[]>([]);

  useQueries({
    queries: [
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
        queryKey: ["getProcessDefinitionById", processDefinitionId],
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: async () => {
          //console.log("fetching getProcessDefinitionById...");
          return await api
            .getProcessDefinitionById(processDefinitionId)
            .then((res: any) => {
              //console.log("getProcessDefinitionByIds result: ", res.description);
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
      // {
      //   queryKey: ["tasks", id],
      //   queryFn: async () => {
      //     //console.log("fetching tasks...");
      //     return await api.getAllTasks(id).then((res: Task[]) => {
      //       setTasks(res);
      //       return res;
      //     });
      //   },
      // },
      {
        queryKey: ["processInstance", id],
        queryFn: async () => {
          return await api.getHistoryProcessInstance(id).then((res: any) => {
            setProcessInstance(res);
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

            return res;
          });
        },
      },
      // {
      //   queryKey: ["bpmnElements", processDefinitionId],
      //   refetchOnWindowFocus: false,
      //   refetchOnReconnect: false,
      //   queryFn: async () => {
      //     //console.log("fetching bpmnElement of id: ", id);
      //     return await api
      //       .getBpmnElements(processDefinitionId)
      //       .then((res: FlowElements[]) => {
      //         setBpmnElements(res);
      //         return res;
      //       });
      //   },
      // },
      {
        queryKey: ["userActions", id],
        queryFn: async () => {
          return await api.getHistoryUserActions(id).then((res: UserCredentials[]) => {
            setUserActions(res);
            return res;
          });
        },
      },
      {
        queryKey: ["bpmnModel", processDefinitionId],
        queryFn: async () => {
          return await api.getBpmnModel(processDefinitionId)
            .then((res: any) => {
              const model = TasksBpmnElements.createTableData(res)
              setModel(model)
              //console.log("model: ", model)
              return model
            })
        }
      }
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
                historyProcess={processInstance}
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
                bpmnElements={model}
                processName={processInstance.processDefinitionName}
              />
            ),
          },
          {
            label: "Actions utilisateur",
            iconId: "fr-icon-user-line",
            content: <TasksManual userActions={userActions} tasks={[]} />,
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
