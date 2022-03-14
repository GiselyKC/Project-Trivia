<<<<<<< HEAD
import { USER_TOKEN, USER_SCORE } from '../actions';
=======
import { USER_SCORE, USER_TOKEN, SET_TIME } from '../actions';
>>>>>>> 786774f340b3d054383b36eb0d2f6d764735ad41

const INITIAL_STATE = {
  token: '',
  time: 30,
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const userToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_TOKEN:
    return {
      ...state,
      token: action.payload.token,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  case USER_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload,
      },
      name: action.payload.name,
      email: action.payload.email };
<<<<<<< HEAD
  case USER_SCORE:
    return { ...state,
      score: action.payload.score,
=======
  case SET_TIME:
    return {
      ...state,
      time: action.payload,
>>>>>>> 786774f340b3d054383b36eb0d2f6d764735ad41
    };
  default:
    return state;
  }
};

export default userToken;
