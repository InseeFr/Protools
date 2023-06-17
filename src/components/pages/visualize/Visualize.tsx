import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Tabs } from '@codegouvfr/react-dsfr/Tabs';
import GeneralInfo from './GeneralInfo';

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
              <Typography variant="body1">
                Liste des variables présentes dans le protocole d&apos;enquête
              </Typography>
            ),
          },
          {
            label: 'Tâches (?)',
            iconId: 'fr-icon-terminal-box-line',
            content: (
              <Typography variant="body1">
                Description des éléments du processus
              </Typography>
            ),
          },
          {
            label: 'Tâches manuelles',
            iconId: 'fr-icon-user-line',
            content: (
              <Typography variant="body1">
                Tâches manuelles en attentes
              </Typography>
            ),
          },
        ]}
      />
    </Stack>
  );
};
export default Visualize;
