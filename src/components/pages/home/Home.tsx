import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Link } from 'react-router-dom';
import ProcessInfo from '../../../lib/model/processInfo';
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();
  const processInfoTemp: ProcessInfo = {
    id: 'id',
    businessKey: 'businessKey',
    processKey: 'processKey',
    documentation: 'documentation',
    startDate: new Date(),
    state: true,
    group: 'group',
    other: 'otherInfo',
  };
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
      <Button
        linkProps={{
          href: '/launch',
        }}
      >
        Lancer un processus
      </Button>
      <Button>
        <Link
          to="/visualize/test"
          state={{
            processInfo: processInfoTemp,
          }}
        >
          Visualiser un processus
        </Link>
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
