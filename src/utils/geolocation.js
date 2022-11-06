if (chrome?.location) {
  // Handling chrome extension here
}

const geoLocation = {
  environment: chrome?.location ? "chrome-extension" : "website",
  setup() {
    if ("geolocation" in navigator) {
      return navigator.permissions.query({ name: "geolocation" });
      // if (result.state === 'granted') {
      // } else if (result.state === 'prompt') {
      // }
      // Don't do anything if the permission was denied.
    } else {
      throw Error("The geoLocationAPI not supported!");
    }
  },
  query() {
    return new Promise((solver) => {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          this.isDisabled = false;
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            altitude: location.coords.altitude,
          };
          solver(coords);
        },
        () => {
          solver(null);
        }
      );
    });
  },
};

export default geoLocation;
