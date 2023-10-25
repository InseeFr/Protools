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
          '6944f428-11a0-11ee-8df9-005056985cf7',
          'Renseigner les métadonnées de processus',
          'Manuelle',
          'Tache de chargement du fichier de contexte pour initialiser les métadonnées de processus',
        ],
        [
          'idTimer1',
          "Timer d'attente",
          'Timer',
          'Déclemchement de la suivante à une date donnée',
        ],
        [
          'idabce2',
          "Valider l'échantillon dans Opale",
          'Manuelle',
          "Tache de validation de l'échantillon dans Opale (vérification de la cohérence des données saisies)",
        ],
      ]}
      headers={['id', 'Libellé', 'Type', 'Documentation']}
    />
  );
};

export default Tasks;
