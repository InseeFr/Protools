import React from 'react';
import type { Route } from 'type-route';
import { Box, Card, Typography, CardContent, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Upload } from '@codegouvfr/react-dsfr/Upload';

import Button from '@codegouvfr/react-dsfr/Button';

import { routes } from '../../../../lib/routes/router';

const UploadFile = ({ route }: { route: Route<typeof routes.upload> }) => {
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
      }}
    >
      <Card sx={{ width: '90%' }}>
        <CardContent>
          <Typography variant="h2">
            Téléchargement du fichier de contexte
          </Typography>

          <Stack spacing={2} sx={{ textAlign: 'start', marginTop: 2 }}>
            <Upload hint="Fichier de contexte, format supporté : .json" />
            <Button
              iconId="fr-icon-checkbox-circle-line"
              onClick={handleSubmit}
            >
              Valider
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadFile;
