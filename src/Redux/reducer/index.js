import { USER_TOKEN, USER_SCORE } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: '',
};

const userToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_TOKEN:
    return {
      token: action.payload.token,
      name: action.payload.name,
      email: action.payload.email };
  case USER_SCORE:
    return { ...state,
      score: action.payload.score,
    };
  default:
    return state;
  }
};

export default userToken;
