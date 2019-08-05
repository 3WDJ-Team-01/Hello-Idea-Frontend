import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import ja from 'react-intl/locale-data/ja';
import ko from 'react-intl/locale-data/ko';
import store from 'store/configure';
import locale from 'locale';
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

addLocaleData([...ko, ...ja]);
localStorage.setItem('lang', 'ko');
const defaultLang = localStorage.getItem('lang') || 'ko';
const Root = () => (
  <Provider store={store}>
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      <BrowserRouter>
        <>
          <Route path="/" component={HeaderContainer} />
          <Switch>
            {/* Main page */}
            <Route path="/" exact component={Main} />
            {/* Alert page */}
            <Route path="/alert/notifications" exact component={Alert} />
            <Route path="/alert/requests" exact component={Alert} />
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
    </IntlProvider>
  </Provider>
);

export default Root;
