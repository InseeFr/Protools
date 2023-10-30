/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
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
import Task from "../../../lib/model/tasks";
import { useApi } from "../../../lib/hooks/useApi";
import ProcessInfo from "../../../lib/model/processInfo";
import ProcessDefinitionDataApi from "../../../lib/model/api/processDefinitionData";

const Visualize = () => {
  const { id, processDefinitionId } = useParams();
  const [rendered, setRendered] = useState<boolean>(false);
  const [currentActiveTask, setCurrentActiveTask] =
    useState<string>("uploadContext");
  const [diagram, setDiagram] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  // @ts-expect-error BpmnJS is not typed
  const bpmnViewerRef = useRef<BpmnJS>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [processInstance, setProcessInstance] = useState<ProcessInfo>(
    {} as ProcessInfo
  );

  const [processDefinitionData, setProcessDefinitionData] =
    useState<ProcessDefinitionDataApi>({} as ProcessDefinitionDataApi);

  const api = useApi();

  const [bpmnQuery, taskQuery, processDefinitionQuery, processInstanceQuery] =
    useQueries({
      queries: [
        {
          queryKey: ["bpmnXml", processDefinitionId],
          queryFn: () => {
            console.log("fetching bpmnXml...");
            return api.getBpmnXml(processDefinitionId).then((res: string) => {
              setDiagram(res);
              return res;
            });
          },
        },
        {
          queryKey: ["tasks", id],
          queryFn: async () => {
            console.log("fetching tasks...");
            await api.getAllTasks(id).then((res: Task[]) => {
              setTasks(res);
              return res;
            });
          },
        },
        {
          queryKey: ["getProcessDefinitionById", processDefinitionId],
          queryFn: async () => {
            console.log("fetching getProcessDefinitionById...");
            await api
              .getProcessDefinitionById(processDefinitionId)
              .then((res: any) => {
                console.log("getProcessDefinitionByIds result: ", res);
                setProcessDefinitionData(res);
                return res;
              });
          },
        },
        {
          queryKey: ["processInstance", id],
          queryFn: async () => {
            console.log("fetching processInstance of id: ", id);
            await api.getProcessInstanceById(id).then((res: any) => {
              console.log("processQuery result: ", res);
              setCurrentActiveTask(res.activityId ? res.activityId : "");
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
      ],
    });

  useEffect(() => {
    const container = containerRef.current;

    bpmnViewerRef.current = new BpmnJS({ container });

    bpmnViewerRef.current.on("import.done", () => {
      bpmnViewerRef.current.get("canvas").zoom("fit-viewport");
    });

    if (bpmnQuery.isSuccess) {
      console.log("Importing diagram...");
      //setDiagram(bpmnQuery.data);
      const bpmnXml = bpmnQuery.data;
      bpmnViewerRef.current?.importXML(bpmnXml).then(() => {
        console.log("Diagram imported");
        const overlays = bpmnViewerRef.current?.get("overlays");
        overlays.add(currentActiveTask, "note", {
          position: {
            bottom: 18,
            right: 18,
          },
          scale: {
            min: 1.2,
          },
          html: '<div class="diagram-note">🦊</div>',
        });
      });
      setRendered(true);
    }

    return () => {
      bpmnViewerRef.current.destroy();
    };
  }, [bpmnQuery.isSuccess, bpmnQuery.data, diagram]);

  if (diagram.length > 0 && rendered) {
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
          className="react-bpmn-diagram-container"
          ref={containerRef}
          style={{ width: "100%", height: "450px" }}
        />
        <Tabs
          tabs={[
            {
              label: "Description",
              iconId: "fr-icon-window-line",
              content: (
                <GeneralInfo
                  date="date"
                  processID={id ? id : "id"}
                  documentation="documentation"
                  activeTask="activeTask"
                  processKey="processKey"
                  businessKey="businessKey"
                  state
                />
              ),
            },
            {
              label: "Variables",
              iconId: "fr-icon-article-line",
              content: (
                <Variables
                  variables={[
                    {
                      name: "variable1",
                      type: "string",
                      value: "value1",
                    },
                    {
                      name: "variable2",
                      type: "string",
                      value: "value2",
                    },
                  ]}
                />
              ),
            },
            {
              label: "Tâches (Description)",
              iconId: "fr-icon-terminal-box-line",
              content: <Tasks bpmnTitle="Nom du bpmn ou autre titre" />,
            },
            {
              label: "Tâches manuelles",
              iconId: "fr-icon-user-line",
              content: <TasksManual tasks={tasks} />,
            },
          ]}
        />
      </Stack>
    );
  }
  return <Typography variant="h1">Loading...</Typography>;
};
export default Visualize;
