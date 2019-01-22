import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './../../Containers/Login/Login';
import Vehicles from './../../Containers/Vehicles/Vehicles';

export const RoutesWithSesion = () => (
  <Switch>
    <Route path="/vehicles" component={Vehicles} exact />
    <Route path="/" component={Login} exact />
    <Redirect to="/" />
  </Switch>
)

export const RoutesWithoutSesion = () => (
  <Switch>
    <Route to="/" component={Login} exact />
    <Redirect to="/" />
  </Switch>
)