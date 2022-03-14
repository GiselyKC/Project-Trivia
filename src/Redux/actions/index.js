export const USER_TOKEN = 'USER_TOKEN';
export const USER_SCORE = 'USER_SCORE';
export const SET_TIME = 'SET_TIME';
export const USER_IMG = 'USER_IMG';

export const userToken = (value = {}) => ({
  type: USER_TOKEN,
  payload: {
    token: value.token,
    name: value.name,
    email: value.email,
  },
});

export const userScore = (payload) => ({
  type: USER_SCORE,
  payload,
  rightQuestion: 1,
});
export const userImg = (payload) => ({
  type: USER_IMG,
  payload,
});

export const setTime = (value) => ({
  type: SET_TIME,
  payload: value,
});
