import { Table } from "@codegouvfr/react-dsfr/Table";
import { ReactNode } from "react";

interface OtherVariableProps {
  variables: ReactNode[][];
}
const OtherVariable = (props: OtherVariableProps) => {
  const { variables } = props;
  //console.log("bpmnElement result:", bpmnElements);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Table
        data={variables}
        fixed
        headers={["name", "value", "type", "scope"]}
      />
    </div>
  );
};

export default OtherVariable;
