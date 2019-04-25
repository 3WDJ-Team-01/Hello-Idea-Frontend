import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configure';
import {
  Main,
  Auth,
  User,
  Group,
  NotFound,
  New,
  Repository,
  Editor,
  Search,
  Explore,
  Trends,
} from './pages';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/search/:searchTo" exact component={Search} />
        <Route path="/auth/:kind" exact component={Auth} />
        <Route path="/trends/:searchTo" exact component={Trends} />
        <Route path="/trends" exact component={Trends} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/user/:user/new" exact component={New} />
        <Route path="/user/:user/:menu" exact component={User} />
        <Route path="/user/:user" exact component={User} />
        <Route
          path="/user/:author/repositories/:repository/editor"
          exact
          component={Editor}
        />
        <Route
          path="/user/:author/repositories/:repository/:menu"
          exact
          component={Repository}
        />
        <Route
          path="/user/:author/repositories/:repository"
          exact
          component={Repository}
        />
        <Route path="/group/:group/:menu" exact component={Group} />
        <Route path="/group/:group" exact component={Group} />
        <Route
          path="/group/:author/repositories/:repository/editor"
          exact
          component={Editor}
        />
        <Route
          path="/group/:author/repositories/:repository/:menu"
          exact
          component={Repository}
        />
        <Route
          path="/group/:author/repositories/:repository"
          exact
          component={Repository}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
