import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, CardContent, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select } from '@codegouvfr/react-dsfr/Select';
import { Input } from '@codegouvfr/react-dsfr/Input';
import Button from '@codegouvfr/react-dsfr/Button';
import { ToggleSwitchGroup } from '@codegouvfr/react-dsfr/ToggleSwitchGroup';
import ReactJson from 'react-json-view';
import { startProcess } from '../../../lib/api/remote/processExecution';
import { getMockProcessDefinitions } from '../../../lib/api/mock/processInfo';

const Launch = () => {
  const [processes, setProcesses] = useState<Array<{ id: any; name: any }>>([]);
  const [processKey, setProcessKey] = useState('');
  const [businessKey, setBusinessKey] = useState('');
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [files, setFiles] = useState('');

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
        alignItems: 'flex-end',
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
              hintText="Saisir la Business key"
              label="Identifiant métier"
              nativeInputProps={{
                onChange: (event) => {
                  setBusinessKey(event.target.value);
                },
                value: businessKey,
              }}
            />
            <ToggleSwitchGroup
              toggles={[
                {
                  defaultChecked: false,
                  inputTitle: 'context-toggle-1',
                  label: 'Télécharger le contexte au lancement',
                  onChange: () => setIsContextOpen(!isContextOpen),
                },
              ]}
            />
            {isContextOpen && (
              <Stack spacing={2} sx={{ textAlign: 'start', paddingBottom: 3 }}>
                <Typography variant="caption">
                  Formats acceptés : json - Vous pourrez visualiser le fichier
                  après l&apos;avoir déposé
                </Typography>
                <input
                  type="file"
                  accept="application/json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    const reader = new FileReader();
                    console.log('File', file);
                    if (file) {
                      reader.readAsText(file, 'UTF-8');
                      reader.onload = (event: ProgressEvent<FileReader>) => {
                        const { result } = event.target as FileReader;
                        const json = JSON.parse(result as string);
                        setFiles(json);
                        console.log('JSON', json);
                      };
                    }
                  }}
                />
                {files && <ReactJson src={JSON.parse(JSON.stringify(files))} />}
              </Stack>
            )}
            <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
              <Button
                iconId="fr-icon-arrow-left-s-line"
                onClick={() => window.history.back()}
                priority="secondary"
              >
                Retour
              </Button>
              <Button
                iconId="fr-icon-checkbox-circle-line"
                onClick={handleStartProcess}
              >
                Valider
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Launch;
