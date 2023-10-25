import { Stack, Typography } from '@mui/material';
import ReactJson from 'react-json-view';

// TODO: add types
interface VariablesProps {
  variables: any;
}
const Variables = (props: VariablesProps) => {
  const { variables } = props;

  return (
    <Stack spacing={2} sx={{ textAlign: 'start', marginTop: 1.5 }}>
      <Typography variant="h6">Variables de contexte</Typography>
      <ReactJson src={JSON.parse(JSON.stringify(variables))} />
    </Stack>
  );
};

export default Variables;
