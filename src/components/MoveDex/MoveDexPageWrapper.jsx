import React from 'react';
import { matchPath, useLocation } from '@docusaurus/router';
import NotFound from '@theme/NotFound';
import renderRoutes from '@docusaurus/renderRoutes';

const MoveDexPageWrapper = (props) => {
  const location = useLocation();
  const subRoutes = props.route.routes;
  const doesCurrentRouteExist = subRoutes.find((subRoute) => matchPath(location.pathname, subRoute));

  if (!doesCurrentRouteExist) {
    return <NotFound />;
  }

  const routeElement = renderRoutes(subRoutes);

  return <>{routeElement}</>;
};

export default MoveDexPageWrapper;
