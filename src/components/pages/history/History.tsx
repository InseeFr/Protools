import { Stack, Typography } from "@mui/material";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { useApi } from "../../../lib/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";
import HistoryTable from "./HistoryTable";
// import { useNavigate } from 'react-router-dom';

const History = () => {
  // const navigate = useNavigate()

  const [HistoryProcesses, setHistoryProcessProcesses] = useState<
    HistoryProcess[]
  >([]);
  // TODO: Parsing des processus en cours

  const api = useApi();

  useQuery(["historyProcess"], async () => {
    const response = await api.getProcessInstances().then((res: any) => {
      setHistoryProcessProcesses(res);
      return res;
    });
    return response;
  });

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

      <HistoryTable history={HistoryProcesses} />

      <Link to={`/launch`} style={{ textDecoration: "none" }}>
        <Button>Lancer un processus</Button>
      </Link>
    </Stack>
  );
};

export default History;
