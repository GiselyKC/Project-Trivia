export const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const returnLocalStorage = (key) => {
  const getResult = localStorage.getItem(key) || '[]';
  return JSON.parse(getResult);
};

export function setLocalStorageScore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorageScore(key) {
  return JSON.parse(localStorage.getItem(key));
}

// export {
//   saveLocalStorage,
//   returnLocalStorage,
// };
