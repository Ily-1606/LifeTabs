/**
 * //TODO Binding token user from chrome storage
 */

chrome?.storage?.local.get(["userToken"]).then(({ userToken }) => {
  if (userToken)
    localStorage.setItem(
      "userToken",
      JSON.stringify({
        value: userToken.value,
      })
    );
});

/**
 * //TODO Sync user token's from chrome storage
 */
chrome?.storage?.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.userToken) {
    const payload = {
      value: changes.userToken?.newValue.value,
    };
    localStorage.setItem("userToken", JSON.stringify(payload));
  }
});

const removeStorage = async ({ key }) => {
  localStorage.removeItem(key);
  if (chrome?.storage) {
    return chrome.storage.local.remove(key);
  }
};

export { removeStorage };
