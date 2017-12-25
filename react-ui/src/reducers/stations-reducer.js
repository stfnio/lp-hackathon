import { FETCH_STATIONS } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_STATIONS:
      return _.mapKeys(action.payload, '_id');
    default:
      return state;
  }
}
