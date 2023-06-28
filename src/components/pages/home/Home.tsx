import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Link } from 'react-router-dom';
import ProcessInfo from '../../../lib/model/processInfo';
import OnGoingProcess from './OngoingProcess';
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
    other: 'otherInfo',
  };

  const processArray = [
    [
      processInfoTemp.processKey,
      processInfoTemp.businessKey,
      processInfoTemp.documentation,
      processInfoTemp.startDate.toLocaleDateString('en-GB'),
      processInfoTemp.state ? 'En cours' : 'Arrêté',
      processInfoTemp.other,
    ],
  ];

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
      <OnGoingProcess
        bpmnTitle="Liste des processus en cours"
        processes={processArray}
      />
    </Stack>
  );
};

export default Home;
