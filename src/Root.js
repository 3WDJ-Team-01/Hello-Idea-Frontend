import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configure';
import {
  Main,
  Auth,
  User,
  NotFound,
  New,
  Repository,
  Editor,
  Search,
} from './pages';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/search/:searchTo" exact component={Search} />
        <Route path="/auth/:kind" exact component={Auth} />
        <Route path="/:user/new" exact component={New} />
        <Route path="/:user/:menu" exact component={User} />
        <Route path="/:user" exact component={User} />
        <Route
          path="/:user/repositories/:repository/editor"
          exact
          component={Editor}
        />
        <Route
          path="/:user/repositories/:repository/:menu"
          exact
          component={Repository}
        />
        <Route
          path="/:user/repositories/:repository"
          exact
          component={Repository}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
