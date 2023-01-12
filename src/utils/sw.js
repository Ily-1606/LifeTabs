function getSubscriptions() {
  this.swRegistration.pushManager.getSubscription().then(
    function (subscription) {
      const isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log("User IS subscribed.");
        this.subscribeUser(this.swRegistration);
      } else {
        console.log("User is NOT subscribed.");
        this.subscribeUser(this.swRegistration);
      }
    }.bind(this)
  );
}
function subscribeUser(cb) {
  const applicationServerPublicKey = import.meta.env
    .VITE_APP_FIREBASE_PUBLIC_KEY;
  this.swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerPublicKey,
    })
    .then(function (subscription) {
      console.log(subscription);
      if (cb) cb(subscription);
    })
    .catch(function (error) {
      console.error("Failed to subscribe the user: ", error);
    });
}
function active() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push are supported");
    navigator.serviceWorker
      .register("/js/sw.js")
      .then(
        function (swReg) {
          this.swRegistration = swReg;
          console.log("Service Worker is registered", swReg);
          this.getSubscriptions();
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Push messaging is not supported");
  }
}
export default {
  swRegistration: "",
  getSubscriptions,
  subscribeUser,
  active,
};
