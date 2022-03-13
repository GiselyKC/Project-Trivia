import { USER_SCORE, USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
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
      token: action.payload.token,
      player: { name: action.payload.name, gravatarEmail: action.payload.email },
    };
  case USER_SCORE:
    return {
      ...state,
      player: { ...state.player, score: action.payload },
    };
  default:
    return state;
  }
};

export default userToken;
