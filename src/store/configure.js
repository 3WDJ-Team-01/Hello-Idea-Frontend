import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import modules from './modules';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

export default createStore(modules, composeEnhancers(applyMiddleware(thunk)));
