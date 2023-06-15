// eslint-disable-next-line import/no-extraneous-dependencies

import type { RouteObject } from 'react-router-dom';
import Home from '../../components/pages/home/Home';
import Visualize from '../../components/pages/visualize/Visualize';
import Launch from '../../components/pages/launch/Launch';
import UploadFile from '../../components/shared/tasks/UploadFile/UploadFile';

// Temp routing
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/visualize',
    element: <Visualize />,
  },
  {
    path: '/launch',
    element: <Launch />,
  },
  {
    path: '/upload-context',
    element: <UploadFile />,
  },
];

export default routes;
