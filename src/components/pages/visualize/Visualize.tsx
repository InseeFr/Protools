import React from 'react';
import type { Route } from 'type-route';
import { routes } from '../../../lib/routes/router';

const Visualize = ({ route }: { route: Route<typeof routes.visualize> }) => {
  return (
    <div>
      <h1>Launch</h1>
    </div>
  );
};
export default Visualize;
