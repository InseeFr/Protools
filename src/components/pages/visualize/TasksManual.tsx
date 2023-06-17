import { Table } from '@codegouvfr/react-dsfr/Table';

interface TasksManualProps {
  bpmnTitle: string;
}
const TasksManual = (props: TasksManualProps) => {
  const { bpmnTitle } = props;
  return (
    <Table
      caption={bpmnTitle}
      data={[
        [
          'idabce1',
          'Lorem ipsum dolor sit amet consectetur adipisicin',
          '01/01/2021',
          'Lorem ipsum dolor sit amet consectetur',
        ],
        [
          'idabce2',
          'Lorem ipsum dolor sit amet consectetur adipisicin',
          '01/01/2021',
          'Lorem ipsum dolor sit amet consectetur',
        ],
      ]}
      headers={['id', 'Libellé', 'Date', 'Déclenchement(TODO)']}
    />
  );
};

export default TasksManual;
