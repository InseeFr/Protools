import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Tabs } from '@codegouvfr/react-dsfr/Tabs';
import GeneralInfo from './GeneralInfo';
import Variables from './Variables';
import Tasks from './Tasks';
import TasksManual from './TasksManual';
import {
  getVariables,
  getBpmnXml,
  getAllTasks,
} from '../../../lib/api/remote/processInfo';
import ProcessInfo from '../../../lib/domain/processInfo';

const Visualize = () => {
  const location = useLocation();
  const data: ProcessInfo = location.state?.processInfo;
  const [variableQuery, bpmnQuery, getTasks] = useQueries({
    queries: [
      {
        queryKey: ['allVariables', data.id],
        queryFn: () => {
          return getVariables;
        },
      },
      {
        queryKey: ['bpmnXml', data.id],
        queryFn: () => {
          return getBpmnXml(data.id);
        },
      },
      {
        queryKey: ['getAllTasks', data.id],
        queryFn: () => {
          return getAllTasks(data.id);
        },
      },
    ],
  });
  return (
    <Stack
      spacing={3}
      sx={{
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Visualiser un processus</Typography>

      <Typography variant="h3">Mettre ici le BPMN Viewer</Typography>
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
            label: 'Tâches (?)',
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
};
export default Visualize;
