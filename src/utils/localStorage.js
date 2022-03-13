export const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const returnLocalStorage = (key) => {
  const getResult = localStorage.getItem(key) || '[]';
  return JSON.parse(getResult);
};

// export {
//   saveLocalStorage,
//   returnLocalStorage,
// };
