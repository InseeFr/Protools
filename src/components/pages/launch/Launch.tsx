import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, CardContent, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select } from '@codegouvfr/react-dsfr/Select';
import { Input } from '@codegouvfr/react-dsfr/Input';
import Button from '@codegouvfr/react-dsfr/Button';
import { startProcess } from '../../../lib/api/remote/processExecution';
import { getMockProcessDefinitions } from '../../../lib/api/mock/processInfo';

const Launch = () => {
  const [processes, setProcesses] = useState<Array<{ id: any; name: any }>>([]);
  const [processKey, setProcessKey] = useState('');
  const [businessKey, setBusinessKey] = useState('');

  const processQuery = useQuery(
    ['processDefinition'],
    getMockProcessDefinitions
  );
  const { mutate } = useMutation(['startProcess'], () =>
    startProcess(processKey, [], businessKey)
  );

  useEffect(() => {
    if (processQuery.isSuccess) {
      const processDefinitions = processQuery.data;
      console.log(processDefinitions);
      const processList = processDefinitions.map((processDefinition: any) => ({
        id: processDefinition.id,
        name: processDefinition.name,
      }));
      setProcesses(processList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processQuery.isSuccess]);

  const handleStartProcess = () => {
    console.log(
      'start process with key',
      processKey,
      'and business key',
      businessKey
    );
    mutate();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
      }}
    >
      <Card sx={{ width: '90%' }}>
        <CardContent>
          <Typography variant="h3">Lancer un processus</Typography>

          <Stack spacing={2} sx={{ textAlign: 'start', marginTop: 2 }}>
            <Select
              hint="Protocole d'enquête"
              label="BPMN à lancer"
              nativeSelectProps={{
                onChange: (event) => setProcessKey(event.target.value),
                value: processKey,
              }}
            >
              <React.Fragment key=".0">
                <option disabled hidden selected value="">
                  Selectionnez une option
                </option>
                {processes.map((process) => (
                  <option key={process.id} value={process.id}>
                    {process.name}
                  </option>
                ))}
              </React.Fragment>
            </Select>

            <Input
              hintText="Text aide à la saisie de la business key"
              label="Label champs de saisie"
              nativeInputProps={{
                onChange: (event) => {
                  setBusinessKey(event.target.value);
                },
                value: businessKey,
              }}
            />
            <Button
              iconId="fr-icon-checkbox-circle-line"
              onClick={handleStartProcess}
            >
              Valider
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Launch;
