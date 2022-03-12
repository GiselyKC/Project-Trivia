export const USER_TOKEN = 'USER_TOKEN';

export const USER_SCORE = 'USER_SCORE';

export const userToken = (value = {}) => ({
  type: USER_TOKEN,
  payload: {
    token: value.token,
    name: value.name,
    email: value.email,
  },
});

export const userScore = (value = 0) => ({
  type: USER_SCORE,
  payload: value,
});
