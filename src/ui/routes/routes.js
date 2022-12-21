import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'ui/components/pages/home/component';
import NavigationHeader from 'ui/components/shared/navigationHeader';
import BPMNViewer from 'ui/components/pages/processView/component';
import ProcessSelect from 'ui/components/pages/processStart/component';
import History from 'ui/components/pages/history/component';
import Visualizer from '../components/pages/visualization/component';
import ProtocolTypeViwer from '../components/pages/visualization/displayProcess';
import UploadFile from 'ui/components/pages/uploadFile/component';
import ReviewUserTask from 'ui/components/pages/reviewUserTask/component';
const RoutesWeb = () => {
	return (
		<Router>
			<div>
				<NavigationHeader />
				<Routes>
					{/* It's good because all components here should be Uncontrolled and it's the case */}
					<Route path={'/'} exact element={<Home />} />
					<Route path={'/process-start'} exact element={<ProcessSelect />} />
					<Route path={'/process'} element={<BPMNViewer />} />
					<Route path={'/history'} exact element={<History />} />
					<Route path={'/protocol-types'} exact element={<Visualizer />} />
					<Route path={'/protocol-display'} element={<ProtocolTypeViwer />} />
					<Route path={'/upload-context'} element={<UploadFile />} />
					<Route path={'/review-task'} element={<ReviewUserTask />} />
				</Routes>
			</div>
		</Router>
	);
};

export default RoutesWeb;
