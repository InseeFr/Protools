import { Table } from "@codegouvfr/react-dsfr/Table";
import { ReactNode } from "react";

interface TasksProps {
  bpmnElements: ReactNode[][];
  processName: string;
}
const Tasks = (props: TasksProps) => {
  const { bpmnElements, processName } = props;
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
        caption={processName}
        data={bpmnElements}
        fixed
        headers={["id", "Libellé", "Type", "Documentation"]}
      />
    </div>
  );
};

export default Tasks;
