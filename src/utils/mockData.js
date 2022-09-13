import theme from 'theme';

// Mock data incident pie
export const IncidentChartdata = {
	labels: ['Services', 'Interne', 'Warning'],
	datasets: [
		{
			label: 'incidents',
			data: [3, 3, 2],
			backgroundColor: ['#F25C54', '#F48A66', '#FEDC86', '#84A98C'],
			borderColor: [theme.palette.background.default],
			borderWidth: 2,
		},
	],
};
// Empty BPMN xlm file
export const emptyBPMN =
	'<?xml version="1.0" encoding="UTF-8"?> <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_11nxm0o" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.1.0"><bpmn:process id="Process_021yyke" isExecutable="false"><bpmn:startEvent id="StartEvent_12bhofd" /></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_021yyke"><bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_12bhofd"><dc:Bounds x="156" y="81" width="36" height="36" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>';

export const defaultDataVariables = [
	{
		id: 'MockData',
		name: '[NomVariable]',
		type: '[TypeVariable (string, bool, etc..)]',
		value: 'Pas de variables trouvée',
		action: '',
	},
];

export const defaultDataManualTask = [
	{
		name: '[NomTask]',
		createTime: '[Ddd Mmm Jj HH:MM:SS UTC YYYY]',
		id: 'Pas de taches manuelles trouvée',
		action: '',
	},
];

export const defaultBpmnElement = [
	{
		name: '[NomElement]',
		id: 'idBPMNElement',
		description: 'Brief description of the task',
		implementationType: 'Whether the task is a delegate or not',
		asynchronous: true,
		action: '',
	},
];

export const taskDictionary = {
	DemandeInformation: ['Fill survey info', 'Entrées Informations (contrôle)'],
	VerificationFinale: [
		'Check Final State',
		'Dire au revoir',
		'Clore la campagne',
	],
	Autre: ['Other', 'Hello', 'initialisation du contexte dans Protools'],
};
