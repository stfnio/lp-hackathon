import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import Home from './containers/Home';
import LogIn from './containers/LogIn';
import RewardShow from './containers/RewardShow';
import PrivateRoute from './containers/PrivateRoute';

import reducers from './reducers/index';
import { LOG_IN_USER } from './actions/types';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

const token = localStorage.getItem('token');
// update application state with token information if needed
if (token) {
  const decoded_token = jwt_decode(token);

  console.log(decoded_token);

  store.dispatch({ type: LOG_IN_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/login" component={LogIn} />
          <PrivateRoute path="/rewards/:id" component={RewardShow} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
