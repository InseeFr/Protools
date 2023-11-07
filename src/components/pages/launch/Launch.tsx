import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Stack,
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
  const [processKey, setProcessKey] = useState("");
  const [businessKey, setBusinessKey] = useState("test");
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [variables, setVariables] = useState([] as any); // eslint-disable-line @typescript-eslint/no-explicit-any -> TODO: fix any
  const [files, setFiles] = useState("");

  const [openError, setOpenError] = useState(false);

  const api = useApi();
  const navigate = useNavigate();
  const processQuery = useQuery({
    queryKey: ["processDefinitions"],
    queryFn: () => {
      return api.getProcessDefinitions();
    },
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

  useEffect(() => {
    console.log("processQuery updated:  ", processQuery.data);
  }, [processQuery.isSuccess]);

  const handleStartProcess = () => {
    console.log(
      "start process with key",
      processKey,
      "and business key",
      businessKey
    );
    processKey.length > 1
      ? mutate({
          processKey: processKey,
          businessKey,
          variables,
        })
      : console.error("processKey is empty");
  };

  if (processQuery.isSuccess && processQuery.data.length > 0) {
    console.log(processQuery);
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
                    onChange: (event) => {
                      console.log(event);
                      setProcessKey(event.target.value);
                    },
                  }}
                >
                  {processQuery.data.map((process: any) => {
                    console.log("process option: ", process);
                    console.log("process.key: ", process.key);
                    return (
                      <option key={process.key} value={process.key}>
                        {process.name}
                      </option>
                    );
                  })}
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
  } else {
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
};

export default Launch;
