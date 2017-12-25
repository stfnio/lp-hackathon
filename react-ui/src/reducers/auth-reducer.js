import {
  LOG_IN_USER,
  LOG_IN_ERROR,
  LOG_OUT_USER,
  SET_ADMIN_PRIVILEGES,
  SET_MANAGER_PRIVILEGES
} from '../actions/types';

export default function(
  state = {
    authenticated: false,
    isAdmin: false,
    isManager: false
  },
  action
) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        error: '',
        authenticated: true
      };
    case LOG_OUT_USER:
      return {
        ...state,
        error: '',
        authenticated: false
      };
    case SET_ADMIN_PRIVILEGES:
      return { ...state, isAdmin: true };
    case SET_MANAGER_PRIVILEGES:
      return { ...state, isManager: true };
    case LOG_IN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
