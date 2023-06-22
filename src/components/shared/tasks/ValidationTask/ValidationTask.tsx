import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, CardContent, Stack } from '@mui/material';

import Button from '@codegouvfr/react-dsfr/Button';

const ValidateTask = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log('submit');
  };

  const handleCancel = () => {
    console.log('cancel');
    navigate(-1);
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
          <Typography variant="h2">Tâche de validation</Typography>
          <Stack
            spacing={0.1}
            sx={{ textAlign: 'start', marginTop: 3, marginBottom: 1 }}
          >
            <Typography variant="h6">
              En exécutant cette tâche, le processus passera à l'étape suivante
            </Typography>
            <Typography variant="caption">
              Je ne sais pas quoi mettre ici (à spec)
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            sx={{ textAlign: 'start', marginTop: 1.5 }}
          >
            <Button
              iconId="fr-icon-arrow-left-s-line"
              onClick={handleCancel}
              priority="secondary"
            >
              Retour
            </Button>
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

export default ValidateTask;
