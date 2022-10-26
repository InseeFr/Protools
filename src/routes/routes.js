import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/pages/home/component';
import NavigationHeader from 'components/shared/navigationHeader';
import BPMNViewer from 'components/pages/processView/component';
import ProcessSelect from 'components/pages/processStart/component';
import FormVariables from 'components/pages/formVariables/component';
import History from 'components/pages/history/component';
import Visualizer from '../components/pages/visuTypes/component';
import ProtocolTypeViwer from '../components/pages/visuTypes/protocoleDisplay';
import UploadFile from 'components/pages/uploadFile/component';
const RoutesWeb = () => {
	return (
		<Router>
			<NavigationHeader />
			<Routes>
				<Route path={'/'} exact element={<Home />} />
				<Route path={'/process'} element={<ProcessSelect />} />
				<Route path={'/process/:processKey/:id'} element={<BPMNViewer />} />
				<Route path={'/form'} element={<FormVariables />} />
				<Route path={'/history'} element={<History />} />
				<Route path={'/protocol-types'} element={<Visualizer />} />
				<Route path={'/protocol-display'} element={<ProtocolTypeViwer />} />
				<Route path={'/upload-context'} element={<UploadFile />} />
			</Routes>
		</Router>
	);
};

export default RoutesWeb;
