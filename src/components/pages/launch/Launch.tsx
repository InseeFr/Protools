import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Stack,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Input } from "@codegouvfr/react-dsfr/Input";
import Button from "@codegouvfr/react-dsfr/Button";
import { ToggleSwitchGroup } from "@codegouvfr/react-dsfr/ToggleSwitchGroup";
import ReactJson from "react-json-view";
//import { getMockProcessDefinitions } from "../../../lib/api/mock/processInfo";
import { useApi } from "../../../lib/hooks/useApi";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../../shared/dialogs/ErrorDialog";

const Launch = () => {
  const [processes, setProcesses] = useState<
    Array<{ key: string; name: string }>
  >([]);
  const [processKey, setProcessKey] = useState("");
  const [businessKey, setBusinessKey] = useState("test");
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [variables, setVariables] = useState([] as any); // eslint-disable-line @typescript-eslint/no-explicit-any -> TODO: fix any
  const [files, setFiles] = useState("");

  const [openError, setOpenError] = useState(false);

  const api = useApi();
  const navigate = useNavigate();
  const processQuery = useQuery(["processDefinition"], async () => {
    const response = await api.getProcessDefinitions().then((res: any[]) => {
      console.log("processQuery result: ", res);
      setProcesses(res);
      return res;
    });
    return response;
  });

  const startProcess: MutationFunction<
    any,
    { processKey: string; businessKey: string; variables: any }
  > = async ({ processKey, businessKey, variables }) => {
    const response = await api.startProcess(processKey, businessKey, variables);
    return response.data;
  };

  const { mutate } = useMutation(["startProcess"], startProcess, {
    onSuccess: () => {
      console.log("onSuccess");
      navigate("/");
    },
    onError: () => {
      console.log("onError");
      setOpenError(true);
    },
  });

  // useEffect(() => {
  //   if (processQuery.isSuccess) {
  //     const processDefinitions: any = processQuery.data;
  //     console.log("processQuery: ", processQuery);
  //     const processList = processDefinitions.map((processDefinition: any) => ({
  //       key: processDefinition.key,
  //       name: processDefinition.name,
  //     }));
  //     setProcesses(processList);
  //     console.log("processQuery.isSuccess", processList);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [processQuery.isSuccess]);

  useEffect(() => {
    console.log("fetch process: ", processes);
  }, [processes]);

  useEffect(() => {
    console.log("processQuery.isSuccess: ", processQuery.isSuccess);
  }, [processQuery.isSuccess]);

  const handleStartProcess = () => {
    console.log(
      "start process with key",
      processKey,
      "and business key",
      businessKey
    );
    mutate({
      processKey:
        processKey.length > 1 ? processKey : "chargementContexteEnqueteur",
      businessKey,
      variables,
    });
  };

  if (processQuery.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "90%",
        }}
      >
        <CircularProgress />
        <Typography>Chargement des données</Typography>
      </Box>
    );
  }
  if (processQuery.isSuccess) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "90%",
          }}
        >
          <Card sx={{ width: "90%" }}>
            <CardContent>
              <Typography variant="h3">Lancer un processus</Typography>

              <Stack spacing={2} sx={{ textAlign: "start", marginTop: 2 }}>
                <Select
                  hint="Protocole d'enquête"
                  label="BPMN à lancer"
                  nativeSelectProps={{
                    value: processKey,
                    onChange: (event) => setProcessKey(event.target.value),
                  }}
                >
                  <MenuItem value="">
                    <em>Selectionnez une option</em>
                  </MenuItem>
                  {processes.map(
                    (process) => (
                      console.log("process: ", process),
                      (
                        <MenuItem key={process.key} value={process.key}>
                          {process.name}
                        </MenuItem>
                      )
                    )
                  )}
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
                      inputTitle: "context-toggle-1",
                      label: "Télécharger le contexte au lancement",
                      onChange: () => setIsContextOpen(!isContextOpen),
                    },
                  ]}
                />
                {isContextOpen && (
                  <Stack
                    spacing={2}
                    sx={{ textAlign: "start", paddingBottom: 3 }}
                  >
                    <Typography variant="caption">
                      Formats acceptés : json - Vous pourrez visualiser le
                      fichier après l&apos;avoir déposé
                    </Typography>
                    <input
                      type="file"
                      accept="application/json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        const reader = new FileReader();
                        console.log("File", file);
                        if (file) {
                          reader.readAsText(file, "UTF-8");
                          reader.onload = (
                            event: ProgressEvent<FileReader>
                          ) => {
                            const { result } = event.target as FileReader;
                            const json = JSON.parse(result as string);
                            setFiles(json);
                            console.log("JSON", json);
                          };
                        }
                      }}
                    />
                    {files && (
                      <ReactJson src={JSON.parse(JSON.stringify(files))} />
                    )}
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
        <ErrorDialog
          openError={openError}
          setOpenError={setOpenError}
          errorDescription="Une erreur s'est produite lors du lancement du processus."
        />
      </>
    );
  }
};

export default Launch;
