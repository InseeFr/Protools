import {
  Grid,
  IconButton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import ProcessDefinitionDataApi from "../../../lib/model/api/processDefinitionData";
import ProcessInfo from "../../../lib/model/displayModels/processInfo";
import moment from "moment";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useApi } from "../../../lib/hooks/useApi";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";

interface GeneralInfoProps {
  processDefinitionData: ProcessDefinitionDataApi;
  processInstance?: ProcessInfo;
  historyProcess?: HistoryProcess;
}
const modal = createModal({
  id: "delete-modal",
  isOpenedByDefault: false,
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
    fontSize: "1.1em",
  },
});

const GeneralInfo = (props: GeneralInfoProps) => {
  const api = useApi();
  const navigate = useNavigate();
  const { processDefinitionData, processInstance, historyProcess } = props;


  const deleteProcessMutationFunction: MutationFunction<any> = async (
    id: unknown
  ) => {
    return await api.stopProcess(id as string);
  };

  const mutate = useMutation({
    mutationFn: deleteProcessMutationFunction,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      console.log("onError");
    },
  });

  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={{ xl: 2, md: 2, lg: 2, xs: 0.5, sm: 1.5 }}
      >
        <Stack spacing={1} alignItems="center">
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Grid item container xs={12} direction="row" alignItems="baseline">
              <Typography color="primary" variant="h6">
                Identifiant:
              </Typography>
              <Typography
                color="primary"
                variant="body1"
                sx={{ marginLeft: 1 }}
              >
                {processInstance?.businessKey || historyProcess?.businessKey || '...'}
              </Typography>
              <NoMaxWidthTooltip
                title={`Identifiant Technique: ${processInstance?.id || historyProcess?.id || '...'}`}
                enterTouchDelay={0}
                leaveTouchDelay={2000}
                arrow
              >
                <IconButton>
                  <FiInfo size={18} />
                </IconButton>
              </NoMaxWidthTooltip>
            </Grid>
            <Grid item container xs={12} direction="row" alignItems="baseline">
              <Typography color="primary" variant="h6">
                Date de création:
              </Typography>
              <Typography
                color="primary"
                variant="body1"
                sx={{ marginLeft: 1 }}
              >
                {moment(processInstance?.startDate || historyProcess?.startDate).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </Grid>
            <Grid item container xs={12} direction="row" alignItems="baseline">
              <Typography color="primary" variant="h6">
                Modèle de processus:
              </Typography>
              <Typography
                color="primary"
                variant="body1"
                sx={{ marginLeft: 1 }}
              >
                {processDefinitionData.name
                  ? processDefinitionData.name
                  : "..."}
              </Typography>
              <NoMaxWidthTooltip
                title={`Version: ${processDefinitionData.version
                    ? processDefinitionData.version
                    : "..."
                  }`}
                enterTouchDelay={0}
                leaveTouchDelay={2000}
                arrow
              >
                <IconButton>
                  <FiInfo size={18} />
                </IconButton>
              </NoMaxWidthTooltip>
            </Grid>
            <Typography color="primary" variant="h6">
              Description:
            </Typography>
            <Typography
              color="primary"
              variant="body1"
              sx={{ marginLeft: 1 }}
              align="left"
            >
              {processInstance ? (processInstance.documentation ? processInstance.documentation : "Aucune documentation") : 'N/A'}

            </Typography>
          </Grid>
        </Stack>

        <Stack spacing={1}>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              État:
            </Typography>
            <Typography color="primary" variant="body1" sx={{ marginLeft: 1 }}>
              {processInstance ? (processInstance?.state ? "Actif" : "Inactif") : 'Arrêté'}

            </Typography>
          </Grid>
          {processInstance ? <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6" sx={{ marginTop: 1 }}>
              Actions:
            </Typography>
            {/* <Button
          iconId="fr-icon-pause-circle-line"
          disabled
          onClick={() => console.log("clicked")}
        >
          {processInstance.state ? "Suspendre" : "Relancer"}
        </Button> */}
            <Button
              iconId="fr-icon-delete-line"
              priority="secondary"
              nativeButtonProps={modal.buttonProps}
            >
              Arrêter
            </Button>
          </Grid> : <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
                Date de fin: 
            </Typography>
            <Typography
              color="primary"
              variant="body1"
            //sx={{ marginLeft: 1 }}
            >
                {historyProcess?.endTime
                  ? " " + moment(historyProcess?.endTime).format("DD/MM/YYYY HH:mm")
                : "..."}
            </Typography>
            <NoMaxWidthTooltip
                title={`Durée: ${historyProcess?.durationInMillis
                  ? moment.duration(historyProcess?.durationInMillis).humanize()
                : "..."
                }`}
              enterTouchDelay={0}
              leaveTouchDelay={2000}
              arrow
            >
              <IconButton>
                <FiInfo size={18} />
              </IconButton>
            </NoMaxWidthTooltip>
          </Grid>}
        </Stack>
      </Stack>

      <modal.Component
        title="Arrêter le processus"
        iconId="fr-icon-checkbox-circle-line"
        buttons={[
          {
            onClick: () => modal.close(),
            doClosesModal: false, //Default true, clicking a button close the modal.
            children: "Annuler",
          },
          {
            iconId: "ri-check-line",
            onClick: () => mutate.mutate(processInstance?.id),
            children: "Valider",
          },
        ]}
      >
        Vous allez arrêter le processus en cours. Etes-vous sûr ?
      </modal.Component>
    </>
  );
};
export default GeneralInfo;
