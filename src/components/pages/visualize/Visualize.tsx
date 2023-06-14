import React from 'react';
import type { Route } from 'type-route';
import { Stack, Typography } from '@mui/material';
import { Tabs } from '@codegouvfr/react-dsfr/Tabs';
import { routes } from '../../../lib/routes/router';

const Visualize = ({ route }: { route: Route<typeof routes.visualize> }) => {
  return (
    <Stack
      spacing={2}
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
              <Typography variant="body1">
                Description du protocole d&apos;enquête
              </Typography>
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
