import { Table } from "@codegouvfr/react-dsfr/Table";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface OtherVariableProps {
  variables: ReactNode[][];
}

const OtherVariable = (props: OtherVariableProps) => {
  const { variables } = props;
  //console.log("variables", variables);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {variables.length > 0 ? (
        <Table
          data={variables}
          fixed
          headers={["name", "value", "type", "scope"]}
        />
      ) : (
        <Typography>Aucune variable</Typography>
      )}
    </div>
  );
};

export default OtherVariable;