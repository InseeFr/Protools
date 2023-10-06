import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import ProcessInfo from '../../../lib/model/processInfo';
import OnGoingProcess from './OngoingProcess';
import { useEffect, useState } from 'react';
import { useApi } from '../../../lib/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();
  const processInfoTemp: ProcessInfo = {
    id: 'id',
    businessKey: 'businessKey',
    processKey: 'processKey',
    documentation: 'documentation exemple (description du processus)',
    startDate: new Date(),
    state: true,
    group: 'group',
    other: 'test',
  };

  const [processes, setProcesses] = useState<any[]>([]);
  // TODO: Parsing des processus en cours

  const api = useApi();

  const processInstanceQuery = useQuery(['processInstances'], async () => {
    const response = await api.getProcessInstances().then((res: any[]) => {
      console.log('processQuery result: ', res);
      setProcesses(res);
      return res;
    });
    return response;
  });

  return (
    <Stack
      spacing={2}
      sx={{
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Home</Typography>

      <OnGoingProcess processes={[processInfoTemp]} />
      <Button
        linkProps={{
          href: '/launch',
        }}
      >
        Lancer un processus
      </Button>
    </Stack>
  );
};

export default Home;
