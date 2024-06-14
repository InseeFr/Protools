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
import "moment/locale/fr";
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
moment.locale('fr');

function humanizeDuration(duration: moment.Duration) {
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let result = '';
  if (days > 0) {
    result += days + ' jours ';
  }
  if (hours > 0) {
    result += hours + ' heures ';
  }
  if (minutes > 0) {
    result += minutes + ' minutes ';
  }

  return result.trim();
}

const GeneralInfo = (props: GeneralInfoProps) => {

  const api = useApi();
  const navigate = useNavigate();
  const { processDefinitionData, processInstance, historyProcess } = props;

  const deleteProcessMutationFunction: MutationFunction<any> = async (
    id: unknown,
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
  //console.log("description", processDefinitionData.description);

  const InfoRow = ({
    title,
    value,
    tooltip,
  }: {
    title: string;
    value: string;
    tooltip?: string;
  }) => (
    <Grid item container xs={12} direction="row" alignItems="baseline">
      <Typography color="primary" variant="h6">
        {title}:
      </Typography>
      <Typography color="primary" variant="body1" sx={{ marginLeft: 1 }}>
        {value}
      </Typography>
      {tooltip && (
        <NoMaxWidthTooltip
          title={tooltip}
          enterTouchDelay={0}
          leaveTouchDelay={2000}
          arrow
        >
          <IconButton>
            <FiInfo size={18} />
          </IconButton>
        </NoMaxWidthTooltip>
      )}
    </Grid>
  );

  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={{ xl: 2, md: 2, lg: 2, xs: 0.5, sm: 1.5 }}
      >
        <Stack spacing={1} alignItems="center">
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <InfoRow
              title="Identifiant"
              value={
                processInstance?.businessKey ||
                historyProcess?.businessKey ||
                "..."
              }
              tooltip={`Identifiant Technique: ${processInstance?.id || historyProcess?.id || "..."}`}
            />
            <InfoRow
              title="Date de création"
              value={moment(
                processInstance?.startDate || historyProcess?.startDate,
              ).format("DD/MM/YYYY HH:mm")}
            />
            <InfoRow
              title="Modèle de processus"
              value={
                processDefinitionData.name ? processDefinitionData.name : "..."
              }
              tooltip={`Version: ${processDefinitionData.version ? processDefinitionData.version : "..."}`}
            />
            <InfoRow
              title="Description"
              value={
                processDefinitionData
                  ? processDefinitionData.description
                    ? processDefinitionData.description
                    : "Aucune documentation"
                  : "N/A"
              }
            />
          </Grid>
        </Stack>

        <Stack spacing={1}>
          <Grid item container xs={12} direction="row" alignItems="baseline">
            <Typography color="primary" variant="h6">
              État:
            </Typography>
            <Typography color="primary" variant="body1" sx={{ marginLeft: 1 }}>
              {processInstance
                ? processInstance?.state
                  ? "Actif"
                  : "Inactif"
                : "Terminé"}
            </Typography>
          </Grid>
          {processInstance ? (
            <Grid item container xs={12} direction="row" alignItems="baseline">
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
            </Grid>
          ) : (
            <Grid item container xs={12} direction="row" alignItems="baseline">
              <Typography color="primary" variant="h6">
                Date de fin:
              </Typography>
              <Typography
                color="primary"
                variant="body1"
                //sx={{ marginLeft: 1 }}
              >
                {historyProcess?.endTime
                  ? " " +
                    moment(historyProcess?.endTime).format("DD/MM/YYYY HH:mm")
                  : "..."}
              </Typography>
                <NoMaxWidthTooltip
                  title={`Durée: ${historyProcess?.durationInMillis
                    ? humanizeDuration(moment.duration(historyProcess?.durationInMillis))
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
          )}
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
