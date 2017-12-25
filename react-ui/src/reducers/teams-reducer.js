import { FETCH_TEAMS, TEAM_COMPLETE_STATION } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TEAMS:
      return _.mapKeys(action.payload, '_id');
    case TEAM_COMPLETE_STATION:
      const teamId = action.payload.teamId;
      const stationId = action.payload.stationId;
      const team = state[teamId];
      const completedStations = team.completedStations;
debugger;
      return {
        ...state,
        [teamId]: {
          ...team,
          completedStations: [...completedStations, stationId]
        }
      };
    default:
      return state;
  }
}
