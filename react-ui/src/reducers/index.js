import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import rewardsReducer from './rewards-reducer';
import userReducer from './user-reducer';
import gameReducer from './game-reducer';
import teamReducer from './team-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  rewards: rewardsReducer,
  user: userReducer,
  game: gameReducer,
  team: teamReducer
});

export default rootReducer;
