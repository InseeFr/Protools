import { Stack, Typography } from "@mui/material";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { useApi } from "../../../lib/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";
import HistoryProcessTable from "./HistoryProcessTable";
import Tabs from "@codegouvfr/react-dsfr/Tabs";
// import HistoricActivity from "../../../lib/model/api/historicActivity";
// import HistoryActivityTable from "./HistoryActivityTable";
// import { useNavigate } from 'react-router-dom';

const History = () => {
  // const navigate = useNavigate()

  const [historyProcesses, setHistoryProcessProcesses] = useState<
    HistoryProcess[]
  >([]);

  // const [historyActivities, setHistoryProcessActivities] = useState<
  //   HistoricActivity[]
  // >([]);
  // TODO: Parsing des processus en cours

  const api = useApi();

  useQuery({
    queryKey: ["historyProcess"],
    queryFn: async () => {
      const response = await api
        .getAllHistoryProcessInstance()
        .then((res: any) => {
          setHistoryProcessProcesses(res);

          return res;
        });
      return response;
    },
  });

  // useQuery({
  //   queryKey: ["historyActivity"],
  //   queryFn: async () => {
  //     const response = await api.getAllHistoricActivity().then((res: any) => {
  //       setHistoryProcessActivities(res);
  //       return res;
  //     });
  //     return response;
  //   },
  // });

  return (
    <Stack
      spacing={2}
      sx={{
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">Historique des Processus</Typography>
      <Tabs
        style={{ width: "130%" }}
        tabs={[
          {
            label: "Processus",
            iconId: "fr-icon-window-line",
            content: <HistoryProcessTable history={historyProcesses} />,
          },

          // {
          //   label: "Activités",
          //   iconId: "fr-icon-window-line",
          //   content: <HistoryActivityTable history={historyActivities} />,
          // },
        ]}
      />

      <Link to={`/launch`} style={{ textDecoration: "none" }}>
        <Button>Lancer un processus</Button>
      </Link>
    </Stack>
  );
};

export default History;
