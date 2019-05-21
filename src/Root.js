import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/configure';
import HeaderContainer from 'containers/HeaderContainer';
import {
  Main,
  Auth,
  Alert,
  User,
  Group,
  NotFound,
  New,
  Repository,
  Mindmap,
  Search,
  Explore,
  Trends,
} from './pages';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <>
        <Route path="/" component={HeaderContainer} />
        <Switch>
          {/* Main page */}
          <Route path="/" exact component={Main} />
          {/* Alert page */}
          <Route path="/alert" exact component={Alert} />
          {/* Search page */}
          <Route path="/search/:searchTo" exact component={Search} />
          {/* Auth page */}
          <Route path="/auth/login" exact component={Auth} />
          <Route path="/auth/register" exact component={Auth} />
          {/* Trends page */}
          <Route path="/trends/:searchTo" exact component={Trends} />
          <Route path="/trends" exact component={Trends} />
          {/* Explore page */}
          <Route path="/explore" exact component={Explore} />
          {/* User page */}
          <Route path="/user/:user/repositories" exact component={User} />
          <Route path="/user/:user/followers" exact component={User} />
          <Route path="/user/:user/followings" exact component={User} />
          <Route path="/user/:user/groups" exact component={User} />
          <Route path="/user/:user/modify" exact component={User} />
          <Route path="/user/:user" exact component={User} />
          {/* Group page */}
          <Route path="/group/:group/people" exact component={Group} />
          <Route path="/group/:group/settings" exact component={Group} />
          <Route path="/group/:group" exact component={Group} />
          {/* Mindmap page */}
          <Route
            path="/user/:author/repositories/:repository/editor"
            exact
            component={Mindmap}
          />
          <Route
            path="/user/:author/repositories/:repository/viewer"
            exact
            component={Mindmap}
          />
          <Route
            path="/group/:author/repositories/:repository/editor"
            exact
            component={Mindmap}
          />
          <Route
            path="/group/:author/repositories/:repository/viewer"
            exact
            component={Mindmap}
          />
          {/* Repository page */}
          <Route
            path="/user/:author/repositories/:repository/settings"
            exact
            component={Repository}
          />
          <Route
            path="/user/:author/repositories/:repository"
            exact
            component={Repository}
          />
          <Route
            path="/group/:author/repositories/:repository/settings"
            exact
            component={Repository}
          />
          <Route
            path="/group/:author/repositories/:repository"
            exact
            component={Repository}
          />
          {/* New page */}
          <Route path="/user/:user/new" exact component={New} />
          <Route path="/group/:user/new" exact component={New} />
          {/* NotFound page */}
          <Route component={NotFound} />
        </Switch>
      </>
    </BrowserRouter>
  </Provider>
);

export default Root;
