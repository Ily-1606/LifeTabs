const hasToken = () => {
  const token = localStorage.getItem("userToken");
  return token ? true : false;
};
const onlyGuest = (callback) => {
  if (hasToken()) {
    if (callback) callback();
    return false;
  }
  return true;
};
const onlyUser = (callback) => {
  if (!hasToken()) {
    if (callback) callback();
    return false;
  }
  return true;
};

const methods = {
  hasToken: hasToken.bind(this),
  onlyGuest: onlyGuest.bind(this),
  onlyUser: onlyUser.bind(this),
};
export default {
  methods,
};
export { onlyGuest, onlyUser };
