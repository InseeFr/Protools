import React, { useState, useEffect, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Tabs } from '@codegouvfr/react-dsfr/Tabs';
import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import GeneralInfo from './GeneralInfo';
import Variables from './Variables';
import Tasks from './Tasks';
import TasksManual from './TasksManual';
import { getVariables, getAllTasks } from '../../../lib/api/remote/processInfo';
import { getBpmnXml } from '../../../lib/api/mock/processInfo';
import ProcessInfo from '../../../lib/model/processInfo';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';

const Visualize = () => {
  const location = useLocation();
  const data: ProcessInfo = location.state?.processInfo;
  const [rendered, setRendered] = useState<boolean>(false);
  const [diagram, setDiagram] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const bpmnViewerRef = useRef<BpmnJS>();

  const [bpmnQuery] = useQueries({
    queries: [
      {
        queryKey: ['bpmnXml', data.id],
        queryFn: () => {
          return getBpmnXml(data.id);
        },
      },
    ],
  });

  useEffect(() => {
    const container = containerRef.current;

    bpmnViewerRef.current = new BpmnJS({ container });

    bpmnViewerRef.current.on('import.done', (event) => {
      const { error, warnings } = event;

      bpmnViewerRef.current.get('canvas').zoom('fit-viewport');
    });

    if (bpmnQuery.isSuccess) {
      setDiagram(bpmnQuery.data);
      const bpmnXml = bpmnQuery.data;
      console.log('BPMN : ', bpmnXml);
      bpmnViewerRef.current?.importXML(bpmnXml);
      setRendered(true);
    }

    return () => {
      bpmnViewerRef.current.destroy();
    };
  }, [bpmnQuery.data, bpmnQuery.isSuccess, diagram]);

  if (diagram.length > 0 && rendered) {
    return (
      <Stack
        spacing={3}
        sx={{
          flexWrap: 'wrap',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="react-bpmn-diagram-container" ref={containerRef} />
        <Tabs
          tabs={[
            {
              label: 'Description',
              iconId: 'fr-icon-window-line',
              content: (
                <GeneralInfo
                  date="date"
                  processID="processID"
                  documentation="documentation"
                  activeTask="activeTask"
                  processKey="processKey"
                  businessKey="businessKey"
                  state
                />
              ),
            },
            {
              label: 'Variables',
              iconId: 'fr-icon-article-line',
              content: (
                <Variables
                  variables={[
                    {
                      name: 'variable1',
                      type: 'string',
                      value: 'value1',
                    },
                    {
                      name: 'variable2',
                      type: 'string',
                      value: 'value2',
                    },
                  ]}
                />
              ),
            },
            {
              label: 'Tâches (Description)',
              iconId: 'fr-icon-terminal-box-line',
              content: <Tasks bpmnTitle="Nom du bpmn ou autre titre" />,
            },
            {
              label: 'Tâches manuelles',
              iconId: 'fr-icon-user-line',
              content: <TasksManual bpmnTitle="Nom du bpmn ou autre titre" />,
            },
          ]}
        />
      </Stack>
    );
  }
  return <Typography variant="h1">Loading...</Typography>;
};
export default Visualize;
