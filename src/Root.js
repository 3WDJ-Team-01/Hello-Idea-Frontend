import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configure';
import { Main, Auth, User, NotFound, New, Repository } from './pages';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth/:kind" exact component={Auth} />
        <Route path="/:user" exact component={User} />
        <Route path="/:user/modify" exact component={User} />
        <Route path="/:user/followers" exact component={User} />
        <Route path="/:user/followings" exact component={User} />
        <Route path="/:user/repositories" exact component={User} />
        <Route path="/:user/new" exact component={New} />
        <Route
          path="/:user/repositories/:repository"
          exact
          component={Repository}
        />
        <Route
          path="/:user/repositories/:repository/settings"
          exact
          component={Repository}
        />

        {/* 
        <Route path="/Check" component={Check} />
        <Route path="/MyPage" component={MyPage} />
        <Route path="/GroupPage" component={GroupPage} />
        <Route path="/ProjectPage" component={ProjectPage} />
        <Route path="/Modify" component={Modify} />
        <Route path="/BrainStorming" component={BrainStorming} />
        <Route path="/Explore" component={Explore} />
        <Route path="/Trends" component={Trends} />
        <Route path="/TrendsResult" component={TrendsResult} />
        <Route path="/StartPage" component={StartPage} /> 
        */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
