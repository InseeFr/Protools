/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Tabs } from '@codegouvfr/react-dsfr/Tabs';
// eslint-disable-next-line import/extensions
import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import GeneralInfo from './GeneralInfo';
import Variables from './Variables';
import Tasks from './Tasks';
import TasksManual from './TasksManual';
import { getBpmnXml, getAllTasks } from '../../../lib/api/mock/processInfo';
import ProcessInfo from '../../../lib/model/processInfo';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import Task from '../../../lib/model/tasks';
import { useApi } from "../../../lib/hooks/useApi";

interface VisualizeProps {
  id: string;
}
const Visualize = (props: VisualizeProps) => {
  const { id } = props;
  const location = useLocation();
  const data: ProcessInfo = location.state?.processInfo;
  const [rendered, setRendered] = useState<boolean>(false);
  const [currentActiveTask, setCurrentActiveTask] =
    useState<string>("uploadContext");
  const [diagram, setDiagram] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  // @ts-expect-error BpmnJS is not typed
  const bpmnViewerRef = useRef<BpmnJS>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const api = useApi();

  const [bpmnQuery, taskQuery, bpmnElements, processInstance] = useQueries({
    queries: [
      {
        queryKey: ["bpmnXml", data.id],
        queryFn: () => {
          return api.getBpmnXml(data.id);
        },
      },
      {
        queryKey: ["tasks", data.id],
        queryFn: () => {
          return api.getAllTasks(data.id);
        },
      },
      {
        queryKey: ["bpmnElements", data.id],
        queryFn: () => {
          return api.getBpmnElements(data.id);
        },
      },
      {
        queryKey: ["processInstance", data.id],
        queryFn: () => {
          return api.getProcessInstanceById(data.id);
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

    if (processInstance.isSuccess) {
      setCurrentActiveTask(processInstance.data.activityId);
    }

    if (bpmnQuery.isSuccess) {
      setDiagram(bpmnQuery.data);
      const bpmnXml = bpmnQuery.data;
      bpmnViewerRef.current?.importXML(bpmnXml).then(() => {
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

  useEffect(() => {
    if (taskQuery.isSuccess) {
      const tasksList: Task[] = [];
      taskQuery.data.forEach((task: Task) => {
        tasksList.push({
          id: task.id,
          label: task.label,
          description: task.description,
          key: task.key,
        });
      });
      setTasks(tasksList);
    }
  }, [taskQuery.isSuccess]);

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
                  processID={id}
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
