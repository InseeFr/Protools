import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import ProcessInfo from '../../../lib/model/processInfo';
import OnGoingProcess from './OngoingProcess';
import { useEffect, useState } from 'react';
import { useApi } from '../../../lib/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate()

  const [processes, setProcesses] = useState<ProcessInfo[]>([]);
  // TODO: Parsing des processus en cours

  const api = useApi();

  const processInstanceQuery = useQuery(["processInstances"], async () => {
    const response = await api.getProcessInstances().then((res: any) => {
      console.log("processQuery result: ", res);

      res.data.data.map((process: any) => {
        const processInfo: ProcessInfo = {
          id: process.id,
          businessKey: process.businessKey,
          processKey: process.processDefinitionName,
          documentation: "",
          startDate: new Date(process.startTime),
          state: true,
          group: "",
          ids: {
            id: process.id,
            processDefinitionId: process.processDefinitionId,
          },
        };
        console.log("Add processInfo to DataTable: ", processInfo);
        if (!processes.some((p) => p.id === process.id)) {
          setProcesses([...processes, processInfo]);
        }
      });
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
    </Stack>
  );
};

export default Home;
