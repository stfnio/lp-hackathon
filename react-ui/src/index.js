import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode'
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import Home from './containers/Home';
import LogIn from './containers/LogIn';
import PrivateRoute from './containers/PrivateRoute';

import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';

const store = createStore(reducers, applyMiddleware(reduxThunk));

const token = localStorage.getItem('token');
// update application state with token information if needed
if (token) {
  // update authentication flag
  const decoded_token = jwt_decode(token);

  console.log(decoded_token)

  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/login" component={LogIn} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
