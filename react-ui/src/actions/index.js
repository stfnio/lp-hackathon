import axios from 'axios';
import { LOG_IN_USER } from './types';

const ROOT_URL = 'http://localhost:5000';

export function logInUser({ tokenId }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth`,
      headers: {
        Authorization: tokenId
      }
    }).then(({ enhancedToken }) => {
      dispatch({
        type: LOG_IN_USER,
        payload: {
          token: enhancedToken
        }
      });

      localStorage.setItem('token', enhancedToken);

      redirectToHomePage();
    });
  };
}
