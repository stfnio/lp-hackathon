import { FETCH_TEAM } from '../actions/types';

export default function(state = { name: '', members: [] }, action) {
  switch (action.type) {
    case FETCH_TEAM:
      return {
        ...state,
        name: action.payload.name,
        members: action.payload.members
      };
    default:
      return state;
  }
}
