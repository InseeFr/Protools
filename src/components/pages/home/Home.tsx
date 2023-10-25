import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import ProcessInfo from '../../../lib/model/processInfo';
import OnGoingProcess from './OngoingProcess';
import { useEffect } from "react";
import { useApi } from "../../../lib/hooks/useApi";
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

  const api = useApi();

  useEffect(() => {
    api.getProcessInstances().then((res) => {
      {
        console.log(res);
      }
    });
  }, []);

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
      <Button
        linkProps={{
          href: '/upload-context',
        }}
      >
        TEMP : Tâche upload
      </Button>
      <Button
        linkProps={{
          href: '/validation-task',
        }}
      >
        TEMP : Tâche validation
      </Button>
    </Stack>
  );
};

export default Home;
