// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, defineRoute, param } from 'type-route';
import Home from '../../components/pages/home/Home';
import Visualize from '../../components/pages/visualize/Visualize';
import Launch from '../../components/pages/launch/Launch';
import UploadFile from '../../components/shared/tasks/UploadFile/UploadFile';
// Temp routing
export const { RouteProvider, useRoute, routes } = createRouter({
  home: defineRoute('/'),
  launch: defineRoute('/launch'),
  visualize: defineRoute('/visualize'),
  upload: defineRoute('/upload'),
});

export const Router = () => {
  const route = useRoute();

  switch (route.name) {
    case 'home':
      return <Home />;
    case 'visualize':
      return <Visualize route={route} />;
    case 'launch':
      return <Launch route={route} />;
    case 'upload':
      return <UploadFile route={route} />;

    default:
      return <h1>404</h1>;
  }
};
