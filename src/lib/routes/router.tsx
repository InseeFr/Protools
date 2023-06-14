// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, defineRoute, param } from 'type-route';
import Home from '../../components/pages/home/Home';
import Visualize from '../../components/pages/visualize/Visualize';
import Launch from '../../components/pages/launch/Launch';

export const { RouteProvider, useRoute, routes } = createRouter({
  home: defineRoute('/'),
  launch: defineRoute('/launch'),
  visualize: defineRoute(
    {
      processId: param.path.string,
    },
    (p) => `/user/${p.processId}`
  ),
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
    default:
      return <h1>404</h1>;
  }
};
