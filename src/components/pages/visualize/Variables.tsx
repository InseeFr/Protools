import { Stack, Typography } from '@mui/material';
import ReactJson from 'react-json-view';
import Variable from "../../../lib/model/api/variable";

// TODO: add types
interface VariablesProps {
  variables: Variable;
}
const Variables = (props: VariablesProps) => {
  const { variables } = props;
  //console.log("variables", variables)
  return (
    <Stack spacing={2} sx={{ textAlign: "start", marginTop: 1.5 }}>
      <Typography variant="h6">Variables de contexte</Typography>
      {variables ? (
        <ReactJson src={JSON.parse(variables.value)} />) : (
        <Typography>Aucune variable</Typography>
      )}
    </Stack>
  );
};

export default Variables;
