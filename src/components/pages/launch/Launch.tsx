import React from 'react';
import type { Route } from 'type-route';
import { routes } from '../../../lib/routes/router';

const Launch = ({ route }: { route: Route<typeof routes.launch> }) => {
  return (
    <div>
      <h1>Launch</h1>
    </div>
  );
};

export default Launch;
