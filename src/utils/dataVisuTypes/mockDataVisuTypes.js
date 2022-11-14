export const enquetesDico = {
	ProcessTestFeature: {
		title: 'Enquête de test',
		description:
			"Enquête de test, cas simple pour tester les fonctionnalités de l'engine et les tâches d'enquête.",
		variables: [
			{
				nom: 'Tâches manuelles 1',
				description: 'Description de la tâche manuelle 1',
			},
		],
		tachesManu: 2,
	},
	EnqueteWeb: {
		title: 'Enquête Web Échantillon Externe',
		description:
			'Enquête web source échantillon externe sans envoi ou réception de messages (se base sur une modélisation de Qualité Volaille)',
		variables: [
			{
				nom: 'idSurvey',
				description: 'Identifiant Enquête',
			},
			{
				nom: 'name',
				description: "Nom de l'enquête",
			},
			{
				nom: 'dateDeb',
				description: 'Date de début de enquête',
			},
			{
				nom: 'dateEnd',
				description: 'Date de fin de enquête',
			},
			{
				nom: 'sampleSize',
				description:
					"Taille de l'échantillon (nombre de personnes interrogées)",
			},
		],
		tachesManu: 2,
	},
	EnqueteWeb2: {
		title: 'Enquête Web Échantillon Externe Avec Messages',
		description:
			'Enquête web source échantillon externe avec envoi ou réception de messages (se base sur une modélisation de Qualité Volaille)',
		variables: [
			{
				nom: 'idSurvey',
				description: 'Identifiant Enquête',
			},
			{
				nom: 'name',
				description: "Nom de l'enquête",
			},
			{
				nom: 'dateDeb',
				description: 'Date de début de enquête',
			},
			{
				nom: 'dateEnd',
				description: 'Date de fin de enquête',
			},
			{
				nom: 'sampleSize',
				description:
					"Taille de l'échantillon (nombre de personnes interrogées)",
			},
		],
		tachesManu: 2,
	},
	EnqueteWebContinue: {
		title: 'Enquête Famille',
		description:
			"Enquête web source échantillon externe avec récupération de l'échantillon en continu via ERA",
		variables: [
			{
				nom: 'Upload du contexte',
				description: 'Upload du fichier de contexte du processus (format XML)',
			},
			{
				nom: 'Clore la campagne',
				description:
					'Formulaire proposant la possibilité de supprimer la campagne dans la plateforme de collecte web Coleman',
			},
		],
		tachesManu: 2,
	},
};
