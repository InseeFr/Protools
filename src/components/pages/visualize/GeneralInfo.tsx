import { Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import ProcessDefinitionDataApi from "../../../lib/model/api/processDefinitionData";
import ProcessInfo from "../../../lib/model/processInfo";
import moment from "moment";

interface GeneralInfoProps {
  processDefinitionData: ProcessDefinitionDataApi;
  processInstance: ProcessInfo;
}

const GeneralInfo = (props: GeneralInfoProps) => {
  const navigate = useNavigate();
  const { processDefinitionData, processInstance } = props;
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={{ xl: 10, md: 6, lg: 5, xs: 0.5, sm: 1.5 }}
      >
        <Stack spacing={1} alignItems="center">
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              Documentation:
            </Typography>
            <Typography
              color="primary"
              variant="body2"
              sx={{ marginLeft: 1 }}
              align="left"
            >
              {processInstance.documentation
                ? processInstance.documentation
                : "Aucune documentation"}
            </Typography>
          </Grid>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              Nom de l&apos;enquête:
            </Typography>
            <Typography color="primary" variant="body2" sx={{ marginLeft: 1 }}>
              {processInstance.businessKey
                ? processInstance.businessKey
                : "Aucun nom d'enquête"}
            </Typography>
          </Grid>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              Type d&apos;enquête:
            </Typography>
            <Typography color="primary" variant="body2" sx={{ marginLeft: 1 }}>
              {processDefinitionData.name ? processDefinitionData.name : "..."}
            </Typography>
          </Grid>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              ProcessID:
            </Typography>
            <Typography color="primary" variant="body2" sx={{ marginLeft: 1 }}>
              {processInstance.id ? processInstance.id : "..."}
            </Typography>
          </Grid>

          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              Date de création:
            </Typography>
            <Typography color="primary" variant="body2" sx={{ marginLeft: 1 }}>
              {moment(processInstance.startDate).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </Grid>
        </Stack>
        <Stack spacing={1}>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              État:
            </Typography>
            <Typography color="primary" variant="body2" sx={{ marginLeft: 1 }}>
              {processInstance.state ? "Actif" : "Inactif"}
            </Typography>
          </Grid>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              Version:
            </Typography>
            <Typography
              color="primary"
              variant="body2"
              align="left"
              sx={{ marginLeft: 1 }}
            >
              {processDefinitionData.version
                ? processDefinitionData.version
                : "..."}
            </Typography>
          </Grid>
        </Stack>
      </Stack>

      <Stack
        spacing={2}
        sx={{ padding: "0.2rem 2.8rem", minwidth: "15%" }}
        alignItems="flex-start"
      >
        <Typography color="primary" variant="h6" sx={{ marginTop: 1 }}>
          Actions:
        </Typography>
        <Button
          iconId="fr-icon-pause-circle-line"
          disabled
          onClick={() => console.log("clicked")}
        >
          {processInstance.state ? "Suspendre" : "Relancer"}
        </Button>
        <Button
          iconId="fr-icon-delete-line"
          priority="secondary"
          disabled
          onClick={() => navigate("/visualize")}
        >
          Supprimer
        </Button>
      </Stack>
    </Stack>
  );
};
export default GeneralInfo;
