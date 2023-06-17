import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Tabs } from '@codegouvfr/react-dsfr/Tabs';
import GeneralInfo from './GeneralInfo';
import Variables from './Variables';
import Tasks from './Tasks';
import TasksManual from './TasksManual';

const Visualize = () => {
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
