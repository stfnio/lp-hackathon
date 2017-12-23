import { LOG_IN_USER, LOG_IN_ERROR, LOG_OUT_USER } from '../actions/types';

export default function(
  state = {
    authenticated: false
  },
  action
) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        error: '',
        token: action.payload.token,
        authenticated: true
      };
    case LOG_OUT_USER:
      return {
        ...state,
        error: '',
        token: null,
        authenticated: false
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload.error
      };
    default:
      return state;
  }
}
