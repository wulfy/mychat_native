import React     from 'react';
import { Route } from 'react-router';

import App from './App';
import Channel from './templates/Channel';
import Home from './templates/Home'; 

export default (
  <Route name="app" component={App} path="/">
    <Route component={Channel} path="/channel/:chanId" />
    <Route component={Home} path="/" />
  </Route>

);