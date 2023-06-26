import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, CardContent, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select } from '@codegouvfr/react-dsfr/Select';
import { Input } from '@codegouvfr/react-dsfr/Input';
import Button from '@codegouvfr/react-dsfr/Button';
import { startProcess } from '../../../lib/api/remote/processExecution';
import { getProcessDefinition } from '../../../lib/api/remote/processInfo';
import { getMockProcessDefinitions } from '../../../lib/api/mock/processInfo';
import { get } from 'http';

const Launch = () => {
  const [processes, setProcesses] = useState(getMockProcessDefinitions());
  const handleSubmit = () => {
    console.log('submit');
  };
  const processQuery = useQuery(
    ['processDefinition'],
    () => getProcessDefinition
  );
  const { isLoading, isError, isSuccess, mutate } = useMutation(() => {
    startProcess('1', [], '1');
    console.log('mutate');
  });

  useEffect(() => {
    if (processQuery.isSuccess) {
      const processDefinitions = processQuery.data;
      const processList: any[] = [];
      processDefinitions.data.forEach((processDefinition: any) => {
        processList.push({
          id: processDefinition.id,
          name: processDefinition.name,
        });
      });
    }
  });
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
              nativeSelectProps={{}}
            >
              <React.Fragment key=".0">
                <option disabled hidden selected value="">
                  Selectionnez une option
                </option>
                <option value="1">BPMN 1</option>
                <option value="2">BPMN 2</option>
              </React.Fragment>
            </Select>

            <Input
              hintText="Text aide à la saisie de la business key"
              label="Label champs de saisie"
              nativeInputProps={{
                onChange: () => {
                  console.log('change');
                },
              }}
            />
            <Button
              iconId="fr-icon-checkbox-circle-line"
              onClick={handleSubmit}
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
