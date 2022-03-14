export const USER_TOKEN = 'USER_TOKEN';
<<<<<<< HEAD
export const USER_SCORE = 'USER_SCORE';
=======
export const SET_TIME = 'SET_TIME';
export const USER_SCORE = 'USER_SCORE';
export const USER_IMG = 'USER_IMG';
>>>>>>> 786774f340b3d054383b36eb0d2f6d764735ad41

export const userToken = (value = {}) => ({
  type: USER_TOKEN,
  payload: {
    token: value.token,
    name: value.name,
    email: value.email,
  },
});

<<<<<<< HEAD
export const userScore = (payload) => ({
  type: USER_SCORE,
  payload,
});
=======
export const userScore = (value = 0) => ({
  type: USER_SCORE,
  payload: value,
});

export const userImg = (payload) => ({
  type: USER_IMG,
  payload,
});

export const setTime = (value) => ({
  type: SET_TIME,
  payload: value,
});
>>>>>>> 786774f340b3d054383b36eb0d2f6d764735ad41
