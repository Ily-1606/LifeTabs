// Init extension load env.json
const ENV_FILE = ".env.local";
let ENV;
fetch(ENV_FILE)
  .then((res) => {
    return res.json();
  })
  .then((env) => {
    ENV = env;
  });
console.log(ENV);
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "/index.html" });
});

chrome.storage.sync.get(["userId"]).then(({ userId }) => {
  if (!userId) {
    chrome.tabs.create({
      url: "/index.html#/welcome",
    });
    // TODO Set userId if is first user
  }
});
