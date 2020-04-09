import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Home useSuspense={false} />} />
      <Route path="/login/" component={Login} />
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
