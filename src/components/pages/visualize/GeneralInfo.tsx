import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';

interface GeneralInfoProps {
  date: string;
  processID: string;
  documentation: string;
  activeTask: string;
  processKey: string;
  businessKey: string;
  state: boolean;
}

const GeneralInfo = (props: GeneralInfoProps) => {
  const navigate = useNavigate();
  const {
    date,
    processID,
    documentation,
    activeTask,
    processKey,
    businessKey,
    state,
  } = props;
  return (
    <Stack direction="row" alignItems="flex-start">
      <Card
        sx={{
          boxShadow: 0,
          textAlign: 'center',
          width: '90%',
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            alignItems="flex-start"
            spacing={{ xl: 10, md: 6, lg: 5, xs: 0.5, sm: 1.5 }}
          >
            <Stack spacing={1} alignItems="center">
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Documentation:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                  align="left"
                >
                  {documentation}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Nom de l&apos;enquête:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  {businessKey}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Type d&apos;enquête:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  {processKey}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  ProcessID:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  {processID}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Groupe habilité:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  ...
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Tâches manuelles en attente:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  {activeTask}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Date de création:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  {date}
                </Typography>
              </Grid>
            </Stack>
            <Stack spacing={1}>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  État:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ marginLeft: 1 }}
                >
                  {state ? 'Actif' : 'Inactif'}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  Autre info:
                </Typography>
                <Typography
                  color="primary"
                  variant="body2"
                  align="left"
                  sx={{ marginLeft: 1 }}
                >
                  Autres informations au sujet de l'enquête
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                direction="row"
                alignItems="baseline"
              >
                <Typography color="primary" variant="h6">
                  ...
                </Typography>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Stack
        spacing={2}
        sx={{ padding: '0.2rem 2.8rem', minwidth: '15%' }}
        alignItems="flex-start"
      >
        <Typography color="primary" variant="h6" sx={{ marginTop: 1 }}>
          Actions:
        </Typography>
        <Button
          iconId="fr-icon-pause-circle-line"
          onClick={() => console.log('clicked')}
        >
          {state ? 'Suspendre' : 'Relancer'}
        </Button>
        <Button
          iconId="fr-icon-delete-line"
          priority="secondary"
          onClick={() => navigate('/visualize')}
        >
          Supprimer
        </Button>
      </Stack>
    </Stack>
  );
};
export default GeneralInfo;
