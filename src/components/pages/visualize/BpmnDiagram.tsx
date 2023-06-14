import React from 'react';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import minimapModule from 'diagram-js-minimap';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import diagram from '../../../assets/mockData/diagram.bpmn';

const BpmnDiagram = () => {
  const viewer = new NavigatedViewer({
    container: '#canvas',
    additionalModules: [minimapModule],
  });

  viewer.importXML(diagram, (err) => {
    if (err) {
      console.error('Failed to load diagram', err);
    } else {
      viewer.get('canvas').zoom('fit-viewport');
    }
  });

  return <div id="canvas" style={{ height: '100vh' }} />;
};

export default BpmnDiagram;
