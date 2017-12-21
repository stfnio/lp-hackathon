import axios from 'axios';
import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:5000';

export function logInUser({ tokenId }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth`,
      headers: {
        Authorization: tokenId
      }
    }).then(user => {
      dispatch({
        type: AUTH_USER
      });

      localStorage.setItem('token', tokenId);

      redirectToHomePage();
    });
  };
}
