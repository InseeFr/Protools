import React, { Fragment, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Box } from '@mui/material';
// BPMN Imports
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import CollapseSubprocessModule from 'bpmn-js-collapse-subprocess';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import minimapModule from 'diagram-js-minimap';
import {
	BpmnPropertiesPanelModule,
	BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
//import { emptyBPMN } from 'utils/mockData';
import 'bpmn-js/dist/assets/diagram-js.css';

const CustomModeler = (props) => {
	// we use reference because modeler is a mutable object for which we need to keep reference
	const modelerRef = useRef(null);
	const url = props.url;

	const bpmContainerRef = useRef();
	const propertiesPanelRef = useRef();
	console.log(bpmContainerRef);

	const saveBPMNDiagram = async (modeler) => {
		modeler.saveXML({ format: true }, function (error, bpmn) {
			if (error) {
				return;
			}

			var svgBlob = new Blob([bpmn], {
				type: 'text/xml',
			});

			var fileName = 'BpmnFile.bpmn';

			var downloadLink = document.createElement('a');
			downloadLink.download = fileName;
			downloadLink.innerHTML = 'Get BPMN File';
			downloadLink.href = window.URL.createObjectURL(svgBlob);
			downloadLink.onclick = function (event) {
				document.body.removeChild(event.target);
			};
			downloadLink.style.visibility = 'hidden';
			document.body.appendChild(downloadLink);
			downloadLink.click();
		});
	};
	const saveBPMNSvg = async (modeler) => {
		modeler.saveSVG({ format: true }, function (error, svg) {
			if (error) {
				return;
			}

			var svgBlob = new Blob([svg], {
				type: 'image/svg+xml',
			});

			var fileName = 'BpmnFile.svg';

			var downloadLink = document.createElement('a');
			downloadLink.download = fileName;
			downloadLink.innerHTML = 'Get BPMN SVG';
			downloadLink.href = window.URL.createObjectURL(svgBlob);
			downloadLink.onclick = function (event) {
				document.body.removeChild(event.target);
			};
			downloadLink.style.visibility = 'hidden';
			document.body.appendChild(downloadLink);
			downloadLink.click();
		});
	};

	// import is fired only once
	useEffect(() => {
		const modeler = (modelerRef.current = new BpmnModeler({
			container: bpmContainerRef.current,
			keyboard: {
				bindTo: window,
			},
			additionalModules: [
				minimapModule,
				BpmnPropertiesPanelModule,
				BpmnPropertiesProviderModule,
				CollapseSubprocessModule,
			],
			propertiesPanel: {
				parent: propertiesPanelRef.current,
			},
		}));

		axios
			.get(url)
			.then((r) => {
				modeler
					.importXML(r.data)

					.then(() => {
						const canvas = modeler.get('canvas');
						canvas.zoom('fit-viewport');
					})
					.catch(console.error);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [url]);

	return (
		<Fragment>
			<Box sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
				<div
					style={{ width: '100%', height: '77vh' }}
					id='bpmncontainer'
					ref={bpmContainerRef}
				></div>
				<div style={{}} id='js-properties-panel' ref={propertiesPanelRef}></div>
			</Box>
			<Button
				sx={{ m: 2 }}
				variant='contained'
				onClick={() => saveBPMNDiagram(modelerRef.current)}
			>
				Sauvegarder le fichier BPMN
			</Button>
			<Button
				onClick={() => {
					saveBPMNSvg(modelerRef.current);
				}}
			>
				Exporter l'image
			</Button>
		</Fragment>
	);
};
export default CustomModeler;
