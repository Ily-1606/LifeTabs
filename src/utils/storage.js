/**
 * //TODO Binding token user from chrome storage
 */

chrome?.storage?.local.get(["userToken"]).then(({ userToken }) => {
  localStorage.setItem("userToken", userToken);
});

/**
 * //TODO Sync user token's from chrome storage
 */
chrome?.storage?.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.userToken) {
    localStorage.setItem("userToken", changes.userToken);
  }
});

const removeStorage = ({ key }) => {
  if (chrome?.storage) {
    chrome.storage.local.remove(key);
    return;
  }
  localStorage.removeItem(key);
};

export { removeStorage };
