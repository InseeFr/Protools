import { Stack, Typography } from '@mui/material';
import ReactJson from 'react-json-view';
import Variable from "../../../lib/model/api/variable";

// TODO: add types
interface VariablesProps {
  variables: Variable;
}
const Variables = (props: VariablesProps) => {
  const { variables } = props;
  return (
    <Stack spacing={2} sx={{ textAlign: "start", marginTop: 1.5 }}>
      <Typography variant="h6">Variables de contexte</Typography>

      <ReactJson src={JSON.parse(variables.value)} />
    </Stack>
  );
};

export default Variables;
