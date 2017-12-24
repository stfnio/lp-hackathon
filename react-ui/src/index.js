import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';
import Home from './containers/Home';
import LogIn from './containers/LogIn';
import Team from './containers/Team';
import RewardList from './containers/RewardList';
import RewardShow from './containers/RewardShow';
import RewardQRCode from './containers/RewardQRCode';
import PrivateRoute from './containers/PrivateRoute';

import reducers from './reducers/index';
import { LOG_IN_USER, SET_USER } from './actions/types';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

const token = localStorage.getItem('token');
// update application state with token information if needed
if (token) {
  const user = jwt_decode(token);

  store.dispatch({ type: LOG_IN_USER });
  store.dispatch({ type: SET_USER, payload: user });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LogIn} />
          <App>
            <Switch>
              <PrivateRoute
                path="/rewards/:id/qr-code"
                component={RewardQRCode}
              />
              <PrivateRoute path="/rewards/:id" component={RewardShow} />
              <PrivateRoute path="/rewards/" component={RewardList} />
              <PrivateRoute path="/team/" component={Team} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </App>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
