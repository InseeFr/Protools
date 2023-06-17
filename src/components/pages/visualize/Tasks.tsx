import { Table } from '@codegouvfr/react-dsfr/Table';

interface TasksProps {
  bpmnTitle: string;
}
const Tasks = (props: TasksProps) => {
  const { bpmnTitle } = props;
  return (
    <Table
      caption={bpmnTitle}
      data={[
        [
          'idabce1',
          'Lorem ipsum dolor sit amet consectetur adipisicin',
          'Lorem ipsum dolor sit amet consectetur',
          'Lorem ipsum dolor sit amet consectetur',
        ],
        [
          'idabce2',
          'Lorem ipsum dolor sit amet consectetur adipisicin',
          'Lorem ipsum dolor sit amet consectetur',
          'Lorem ipsum dolor sit amet consectetur',
        ],
      ]}
      headers={['id', 'Libellé', 'Type', 'Documentation']}
    />
  );
};

export default Tasks;
