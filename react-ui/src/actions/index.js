import axios from 'axios';
import { LOG_IN_USER, FETCH_REWARDS } from './types';

const ROOT_URL = 'http://localhost:5000';

export function logInUser({ tokenId }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth`,
      headers: {
        Authorization: tokenId
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

export function fetchRewards() {
  return dispatch => {
    axios({
      method: 'get',
      url: `${ROOT_URL}/api/rewards`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(rewards => {
      dispatch({
        type: FETCH_REWARDS,
        payload: rewards
      });
    });
  };
}
