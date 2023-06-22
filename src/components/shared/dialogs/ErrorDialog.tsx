import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogContentText,
} from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';

interface ErrorDialogProps {
  openError: boolean;
  setOpenError: (open: boolean) => void;
  errorDescription: string;
}

const ErrorDialog = (props: ErrorDialogProps) => {
  const { openError, setOpenError, errorDescription } = props;
  return (
    <Dialog open={openError}>
      <DialogTitle>
        <Typography variant="h5">Une erreur s'est produite</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogContentText>
          <Typography variant="subtitle1">{errorDescription}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        return (<Button onClick={() => setOpenError(false)}>Fermer</Button>
        );
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
