export const enquetesDico = {
	EnqueteTest: {
		title: 'Enquête de test',
		description:
			'Enquête de test, cas simple pour le développement du premier prototype (Stage M2)',
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
		title: 'Enquête Web source échantillon externe en continue',
		description:
			"Enquête web source échantillon externe avec récupération de l'échantillon en continu (se base sur une modélisation de l 'enquête Famille)",
		variables: [
			{
				nom: 'Specs',
				description: 'Spec content',
			},
		],
		tachesManu: 0,
	},
};
