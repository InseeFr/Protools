import { Typography, Stack } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';

const NotFound = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">Page non trouvée</Typography>
      <Typography variant="subtitle1">
        La page que vous cherchez n'existe pas. Le bouton suivant vous permet de
        revenir à l'accueil.
      </Typography>
      <Button
        linkProps={{
          href: '/',
        }}
      >
        Retour à l'accueil
      </Button>
    </Stack>
  );
};

export default NotFound;
