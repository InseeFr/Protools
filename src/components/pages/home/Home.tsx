import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack
      spacing={2}
      sx={{
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Home</Typography>
      <Button
        linkProps={{
          href: '/launch',
        }}
      >
        Lancer un processus
      </Button>
      <Button
        linkProps={{
          href: '/visualize',
        }}
      >
        Visualiser un processus
      </Button>
      <Button
        linkProps={{
          href: '/upload-context',
        }}
      >
        TEMP : Tâche upload
      </Button>
    </Stack>
  );
};

export default Home;
