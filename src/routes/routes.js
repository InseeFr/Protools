import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/pages/home/component';
import NavigationHeader from 'components/shared/navigationHeader';
import Design from 'components/pages/design/component';
import Display from '../components/pages/design/bpmnDisplay';
import BPMNViewer from 'components/pages/processView/component';
import ProcessSelect from 'components/pages/processStart/component';
import FormVariables from 'components/pages/formVariables/component';
import History from 'components/pages/history/component';
import Visualizer from '../components/pages/visuTypes/component';
import ProtocolTypeViwer from '../components/pages/visuTypes/protocoleDisplay';
const RoutesWeb = () => {
	return (
		<Router>
			<NavigationHeader />
			<Routes>
				<Route path={'/'} exact element={<Home />} />
				<Route path={'/process'} element={<ProcessSelect />} />
				<Route path={'/process/:processKey/:id'} element={<BPMNViewer />} />
				<Route path={'/design'} element={<Design />} />
				<Route path={'/display'} element={<Display />} />
				<Route path={'/form'} element={<FormVariables />} />
				<Route path={'/history'} element={<History />} />
				<Route path={'/protocol-types'} element={<Visualizer />} />
				<Route path={'/protocol-display'} element={<ProtocolTypeViwer />} />
			</Routes>
		</Router>
	);
};

export default RoutesWeb;
