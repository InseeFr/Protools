import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import ProcessInfo from '../../../lib/model/processInfo';
import OnGoingProcess from './OngoingProcess';
import { useState } from "react";
import { useApi } from "../../../lib/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate()

  const [processes, setProcesses] = useState<ProcessInfo[]>([]);

  const api = useApi();

  useQuery(["processInstances"], async () => {
    const response = await api.getProcessInstances().then((res: any) => {
      setProcesses(res);
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
      <Typography variant="h1">Home</Typography>

      <OnGoingProcess processes={processes} />

      <Link to={`/launch`} style={{ textDecoration: "none" }}>
        <Button>Lancer un processus</Button>
      </Link>
      <Link to={`/history`} style={{ textDecoration: "none" }}>
        <Button priority="secondary">Historique des processus</Button>
      </Link>
    </Stack>
  );
};

export default Home;
