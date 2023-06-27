import { Table } from '@codegouvfr/react-dsfr/Table';

interface TasksManualProps {
  bpmnTitle: string;
  tasks: string[][];
}
const TasksManual = (props: TasksManualProps) => {
  const { bpmnTitle, tasks } = props;
  return (
    <Table
      caption={bpmnTitle}
      data={tasks}
      headers={['id', 'Libellé', 'Date', 'Déclenchement(TODO)']}
    />
  );
};

export default TasksManual;
