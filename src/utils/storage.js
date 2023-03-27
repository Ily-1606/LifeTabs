/**
 * //TODO Binding token user from chrome storage
 */
import store from "~/store";
chrome?.storage?.local.get(["userToken"]).then(({ userToken }) => {
  if (userToken)
    localStorage.setItem(
      "userToken",
      JSON.stringify({
        value: userToken.value,
      })
    );
});

const handleCacheBinding = (changes) => {
  for (const key in changes) {
    const payload = {
      value: changes[key].newValue.value,
      updated_at: changes[key].newValue.updated_at,
    };
    store.commit("set", {
      key,
      value: payload,
      module: changes[key].newValue.module,
    });
  }
};

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
  handleCacheBinding(changes);
});

const removeStorage = async ({ key }) => {
  localStorage.removeItem(key);
  if (chrome?.storage) {
    return chrome.storage.local.remove(key);
  }
};

export { removeStorage };
