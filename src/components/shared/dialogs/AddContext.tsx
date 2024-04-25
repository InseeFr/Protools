import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,

} from '@mui/material';
import Button from '@codegouvfr/react-dsfr/Button';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import { useApi } from '../../../lib/hooks/useApi';

interface AddContextDialogDialogProps {
  uploadContext: boolean;
  id?: string;
  taskId?: string;
  setUploadContext: (value: boolean) => void;
}

const AddContextDialog = (props: AddContextDialogDialogProps) => {
  const {
    uploadContext,
    id,
    taskId,
    setUploadContext,
  } = props;
  const [files, setFiles] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [openError, setOpenError] = useState(false);
  const api = useApi();
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

  const handleSubmit = async () => {
    console.log("submit");
    try {
      await api.executeTaskContext(taskId, files);
      setUploadContext(false);
    } catch (e: any) {
      console.error(e);
      setErrorDescription(e.message);
      setOpenError(true);
    }
  };
  return (
    <Dialog open={uploadContext}>
      <DialogTitle>Renseigner les métadonnées de processus</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >


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

        </Stack>
        {
          openError && (
            <Typography
              variant="body1"
              sx={{ color: "error.main", marginTop: 2 }}
            >
              {errorDescription}
            </Typography>
          )
        }
      </DialogContent>

      <DialogActions>
        <Button
          iconId="fr-icon-arrow-left-s-line"
          onClick={() => setUploadContext(false)}
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
      </DialogActions>
    </Dialog>
  );
};

AddContextDialog.defaultProps = {
  id: null,
  taskId: null
};

export default AddContextDialog;
