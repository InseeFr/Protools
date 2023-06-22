import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogContentText,
} from '@mui/material';
import Button from '@codegouvfr/react-dsfr/Button';

interface ConfirmationDeleteDialogProps {
  openConfirmationDelete: boolean;
  setConfirmationDelete: (open: boolean) => void;
  handleDeleteFunction: (id?: string) => void;
  id?: string;
}

const ConfirmationDeleteDialog = (props: ConfirmationDeleteDialogProps) => {
  const {
    setConfirmationDelete,
    openConfirmationDelete,
    id,
    handleDeleteFunction,
  } = props;
  return (
    <Dialog open={openConfirmationDelete}>
      <DialogTitle>Suppression</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogContentText>
          <Typography variant="body1">
            Voulez vous vraiment supprimer ce processus ?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          priority="secondary"
          onClick={() => setConfirmationDelete(false)}
        >
          Annuler
        </Button>
        <Button
          onClick={
            id ? () => handleDeleteFunction(id) : () => handleDeleteFunction()
          }
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDeleteDialog.defaultProps = {
  id: null,
};

export default ConfirmationDeleteDialog;
