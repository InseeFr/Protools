import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { routes } from '../../../lib/routes/router';

const Home = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Home</Typography>
      <Button
        linkProps={{
          href: routes.launch().link.href,
        }}
      >
        Lancer un processus
      </Button>
    </Stack>
  );
};

export default Home;
