const hasToken = () => {
  const token = localStorage.getItem("userToken");
  return token ? true : false;
};
const onlyGuest = (callback) => {
  if (hasToken()) {
    callback();
    return false;
  }
  return true;
};
const methods = {
  hasToken: hasToken.bind(this),
  onlyGuest: onlyGuest.bind(this),
};
export default {
  methods,
};
export { onlyGuest };
