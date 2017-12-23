import axios from 'axios';
import { LOG_IN_USER } from './types';

const ROOT_URL = 'http://localhost:5000';

export function logInUser({ googleToken }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth`,
      headers: {
        Authorization: googleToken
      }
    }).then(({ token }) => {
      dispatch({
        type: LOG_IN_USER
      });

      localStorage.setItem('token', token);

      redirectToHomePage();
    });
  };
}
