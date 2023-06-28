import { Table } from '@codegouvfr/react-dsfr/Table';

interface OnGoingProcessProps {
  bpmnTitle: string;
  processes: string[][];
}
const OnGoingProcess = (props: OnGoingProcessProps) => {
  const { bpmnTitle, processes } = props;
  return (
    <Table
      caption={bpmnTitle}
      data={processes}
      headers={[
        'Nom',
        'Type',
        'Description',
        'Date de début',
        'Statut',
        'Actions(TODO)',
      ]}
    />
  );
};

export default OnGoingProcess;
