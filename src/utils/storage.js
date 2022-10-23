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
