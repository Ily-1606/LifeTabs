// Init extension load env.json
const ENV_FILE = "/.env.local.json";
import storageManagement from "./storage";
import cacheManagement from "./cache";
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "/index.html" });
});

// chrome.storage.local.get(["userId"]).then(({ userId }) => {
//   if (!userId) {
//     chrome.tabs.create({
//       url: "/index.html#/welcome",
//     });
//     // TODO Set userId if is first user
//   }
// });
self.env = {};
(async () => {
  await fetch(ENV_FILE)
    .then((res) => {
      return res.json();
    })
    .then((env) => {
      self.env = env;
    });
  const tokenInfo = await storageManagement.get("userToken");
  self.env.user_token = tokenInfo.value;
  storageManagement.onChange("test", (res) => {
    self.env.user_token = res.newValue;
  });
  cacheManagement.saveAll();
})();
chrome.alarms.create("reloadCache", {
  periodInMinutes: cacheManagement.CACHE_EXP,
});
chrome.alarms.onAlarm.addListener((e) => {
  if (e.name === "reloadCache") {
    cacheManagement.saveAll();
  }
});
