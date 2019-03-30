import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configure';
import { Main, Auth, User, NotFound } from './pages';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth/:kind" exact component={Auth} />
        <Route path="/:user" exact component={User} />

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
