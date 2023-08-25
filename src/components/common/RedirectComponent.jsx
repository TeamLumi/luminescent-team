import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function RedirectComponent({ redirectPath }) {
  return <Redirect to={redirectPath} />;
}
