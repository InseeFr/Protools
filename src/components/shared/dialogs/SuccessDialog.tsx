import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogContentText,
} from '@mui/material';
import { Button } from '@codegouvfr/react-dsfr/Button';

interface SuccessDialogProps {
  openSuccess: boolean;
  setOpenSuccess: (open: boolean) => void;
  successDescription: string;
}

const SuccessDialog = (props: SuccessDialogProps) => {
  const { openSuccess, setOpenSuccess, successDescription } = props;
  return (
    <Dialog open={openSuccess}>
      <DialogTitle>
        <Typography variant="h5">Process Engine</Typography>
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
          <Typography variant="subtitle1">{successDescription}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        return (<Button onClick={() => setOpenSuccess(false)}>Fermer</Button>
        );
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
