export const lowerKeysObject = (obj) => {
  let lowerKeysObject = {};
  Object.keys(obj).forEach((k) => {
    lowerKeysObject[k.toLowerCase()] = obj[k];
  });
  return lowerKeysObject;
};
