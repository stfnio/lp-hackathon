import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  LOG_IN_USER,
  LOG_OUT_USER,
  FETCH_REWARDS,
  FETCH_REWARD,
  SET_USER,
  FETCH_GAME,
  FETCH_TEAM,
  SET_ADMIN_PRIVILEGES,
  SET_MANAGER_PRIVILEGES,
  FETCH_TEAMS,
  FETCH_STATIONS,
  TEAM_COMPLETE_STATION
} from './types';

export function logInUser({ tokenId }, redirectToHomePage) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${window.ROOT_URL}/auth`,
      headers: {
        Authorization: tokenId
      }
    }).then(res => {
      dispatch({
        type: LOG_IN_USER
      });

      localStorage.setItem('token', res.data.token);

      const user = jwt_decode(res.data.token);

      dispatch({ type: SET_USER, payload: user });

      if (user.role === 'Admin') {
        dispatch({ type: SET_ADMIN_PRIVILEGES });
      } else if (user.role === 'Manager') {
        dispatch({ type: SET_MANAGER_PRIVILEGES });
      }

      redirectToHomePage();
    });
  };
}

export function fetchUser(userId) {
  return dispatch => {
    axios({
      method: 'get',
      url: `${window.ROOT_URL}/api/users/${userId}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(({ data }) => {
      const user = data;

      dispatch({ type: SET_USER, payload: user });

      if (user.role === 'Admin') {
        dispatch({ type: SET_ADMIN_PRIVILEGES });
      } else if (user.role === 'Manager') {
        dispatch({ type: SET_MANAGER_PRIVILEGES });
      }
    });
  };
}

export function logOutUser(redirectToLoginPage) {
  localStorage.removeItem('token');

  return {
    type: LOG_OUT_USER
  };
}

export function fetchRewards() {
  return dispatch => {
    axios({
      method: 'get',
      url: `${window.ROOT_URL}/api/rewards`,
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
      url: `${window.ROOT_URL}/api/rewards/${id}`,
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

export function fetchGame() {
  return dispatch => {
    axios({
      method: 'get',
      url: `${window.ROOT_URL}/api/game`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(({ data }) => {
      dispatch({
        type: FETCH_GAME,
        payload: {
          isStarted: data.game.isStarted
        }
      });

      dispatch({
        type: FETCH_TEAM,
        payload: {
          name: data.group.name,
          members: data.group.users
        }
      });
    });
  };
}

export function setUserReadiness(isReady) {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: `${window.ROOT_URL}/api/ready`,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data: {
        isReady
      }
    }).then(() => {
      const useId = getState().user._id;

      dispatch(fetchUser(useId));
    });
  };
}

export function fetchTeams() {
  return dispatch => {
    axios({
      method: 'get',
      url: `${window.ROOT_URL}/api/groups`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(({ data }) => {
      dispatch({
        type: FETCH_TEAMS,
        payload: data
      });
    });
  };
}

export function fetchStations() {
  return dispatch => {
    axios({
      method: 'get',
      url: `${window.ROOT_URL}/api/stations`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(({ data }) => {
      dispatch({
        type: FETCH_STATIONS,
        payload: data
      });
    });
  };
}

export function onTeamCompleteStation(teamId, stationId, rewardPoints) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${window.ROOT_URL}/api/groups/stationCheckIn`,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data: {
        group: teamId,
        station: stationId,
        rewardPoints
      }
    }).then(() => {
      dispatch({
        type: TEAM_COMPLETE_STATION,
        payload: {
          teamId,
          stationId
        }
      });
    });
  };
}
