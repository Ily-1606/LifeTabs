self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.message,
    icon: "/assets/icons/UKN.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
