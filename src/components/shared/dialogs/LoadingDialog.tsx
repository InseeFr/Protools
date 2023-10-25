import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogContentText,
  CircularProgress,
} from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';

interface LoadingModalProps {
  openLoading: boolean;
  setOpenLoading: (open: boolean) => void;
}

const LoadingModal = (props: LoadingModalProps) => {
  const { setOpenLoading, openLoading } = props;
  return (
    <Dialog open={openLoading}>
      <DialogTitle>
        <Typography variant="h5">Chargement des données...</Typography>
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
          <CircularProgress />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        return (<Button onClick={() => setOpenLoading(false)}>Fermer</Button>
        );
      </DialogActions>
    </Dialog>
  );
};

export default LoadingModal;
