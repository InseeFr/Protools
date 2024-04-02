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
import ReactJson from "react-json-view";
//import { getMockProcessDefinitions } from "../../../lib/api/mock/processInfo";
import { useApi } from "../../../lib/hooks/useApi";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../../shared/dialogs/ErrorDialog";

const Launch = () => {
  const [processKey, setProcessKey] = useState("");
  const [businessKey, setBusinessKey] = useState("test");
  const [variables, setVariables] = useState("");
  const [error, setError] = useState(false);

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
    { processKey: string; businessKey: string; variables: string }
  > = async ({ processKey, businessKey }) => {
    const response = await api.startProcessWithContext(
      processKey,
      businessKey,
      variables
    );
    if (response.status !== 200) {
      throw new Error("Erreur lors du lancement du processus");
    }
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: startProcess,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      setOpenError(true);
    },
  });

  // useEffect(() => {
  //   console.log("processQuery updated:  ", processQuery.data);
  // }, [processQuery.isSuccess]);

  const handleStartProcess = () => {
    processKey && businessKey && variables
      ? mutate({
          processKey: processKey,
          businessKey,
          variables,
        })
      : setError(true);
  };

  if (processQuery.isSuccess && processQuery.data.length > 0) {
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
                  hint="Choisir un modèle de processus dans la liste déroulante"
                  label="Modèle de processus"
                  state={error ? "error" : "default"}
                  stateRelatedMessage="Veuillez sélectionner un processus"
                  nativeSelectProps={{
                    value: processKey,
                    onChange: (event) => {
                      setProcessKey(event.target.value);
                    },
                  }}
                >
                  <option value="" disabled hidden>
                    Selectionnez une option
                  </option>
                  {processQuery.data.map((process: any) => {
                    return (
                      <option key={process.key} value={process.key}>
                        {process.name}
                      </option>
                    );
                  })}
                </Select>

                <Input
                  hintText="Saisir un identifiant pour le processus"
                  label="Identifiant métier"
                  nativeInputProps={{
                    onChange: (event) => {
                      setBusinessKey(event.target.value);
                    },
                    value: businessKey,
                  }}
                />
                <Stack
                  spacing={1}
                  sx={{ textAlign: "start", paddingBottom: 3 }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      color:
                        error && variables.length < 2 ? "#CE0500" : "inherit",
                    }}
                  >
                    Fichier de contexte
                  </Typography>
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
                      if (file) {
                        reader.readAsText(file, "UTF-8");
                        reader.onload = (event: ProgressEvent<FileReader>) => {
                          const { result } = event.target as FileReader;
                          const json = JSON.parse(result as string);
                          setVariables(json);
                          console.log("JSON uploaded", json);
                        };
                      }
                    }}
                  />
                  {variables && (
                    <ReactJson src={JSON.parse(JSON.stringify(variables))} />
                  )}{" "}
                </Stack>
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
          errorDescription="Une erreur s'est produite lors du lancement du processus. Veuillez vérifier l'intégralité des champs."
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
