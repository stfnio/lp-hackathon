import { FETCH_GAME } from '../actions/types';

export default function(state = { isStarted: false }, action) {
  switch (action.type) {
    case FETCH_GAME:
      return { ...state, isStarted: action.payload.isStarted };
    default:
      return state;
  }
}
