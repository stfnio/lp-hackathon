import axios from 'axios';
import { LOG_IN_USER, FETCH_REWARDS, FETCH_REWARD } from './types';

const ROOT_URL = 'http://localhost:5000';

export function logInUser({ tokenId }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth`,
      headers: {
        Authorization: tokenId
      }
    }).then(res => {
      dispatch({
        type: LOG_IN_USER
      });

      localStorage.setItem('token', res.data.token);

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
    }).then(res => {
      dispatch({
        type: FETCH_REWARDS,
        payload: res.data
      });
    });
  };
}

export function fetchReward(id) {
  return dispatch => {
    axios({
      method: 'get',
      url: `${ROOT_URL}/api/rewards/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      dispatch({
        type: FETCH_REWARD,
        payload: res.data
      });
    });
  };
}
