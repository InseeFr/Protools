import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, Typography, CardContent, Stack } from "@mui/material";
import ReactJson from "react-json-view";

import Button from "@codegouvfr/react-dsfr/Button";
import { useApi } from "../../../../lib/hooks/useApi";
import ErrorDialog from "../../dialogs/ErrorDialog";

const UploadFile = () => {
  const api = useApi();
  const { taskId } = useParams();
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const [errorDescription, setErrorDescription] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleSubmit = async () => {
    console.log("submit");
    try {
      await api.executeTaskContext(taskId, files);
      navigate(-1);
    } catch (e: any) {
      console.error(e);
      setErrorDescription(e.message);
      setOpenError(true);
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    //console.log("File", file);
    if (file) {
      reader.readAsText(file, "UTF-8");
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const { result } = event.target as FileReader;
        const json = JSON.parse(result as string);
        setFiles(json);
        //console.log("JSON Uploaded", json);
      };
    }
  };
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
            <Typography variant="h2">
              Téléchargement du fichier de contexte
            </Typography>
            <Stack
              spacing={0.1}
              sx={{ textAlign: "start", marginTop: 3, marginBottom: 1 }}
            >
              <Typography variant="body1">
                Déposer ici le fichier de contexte
              </Typography>
              <Typography variant="caption">
                Formats acceptés : json - Vous pourrez visualiser le fichier
                après l&apos;avoir déposé
              </Typography>
            </Stack>
            <Stack spacing={2} sx={{ textAlign: "start", marginTop: 1.5 }}>
              <input
                type="file"
                accept="application/json"
                onChange={handleChange}
              />
              {files && <ReactJson src={JSON.parse(JSON.stringify(files))} />}
              <Stack spacing={2} direction="row">
                <Button
                  iconId="fr-icon-arrow-left-s-line"
                  onClick={handleCancel}
                  priority="secondary"
                >
                  Retour
                </Button>
                <Button
                  iconId="fr-icon-checkbox-circle-line"
                  onClick={handleSubmit}
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
        errorDescription={errorDescription}
      />
    </>
  );
};

export default UploadFile;
