import React     from 'react';
import { Route } from 'react-router';

import App from './App';
import Channel from './templates/Channel';
import Home from './templates/Home'; 

export default (
  <App>
    <Route component={Channel} path="/channel/:chanId" />
    <Route component={Home} path="/home" />
  </App>

);