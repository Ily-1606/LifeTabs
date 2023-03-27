import storageManagement from "./storage";
/**
 * @typedef {Object} userLocationInfo
 * @property {Number} accuracy
 * @property {Number} altitude
 * @property {Number} latitude
 * @property {Number} longitude
 *
 * @typedef {Function} format - Format the location
 * @returns {locationFormatted}
 *
 *
 * @typedef {String} locationFormatted - The data location formatted
 * @example
 *  returns 15.980974919209327,108.24918514849116
 */

const locationManagement = {
  /**
   * @this Promise<userLocationInfo>
   * @name Promise#format
   * @return {Promise<locationFormatted>}
   */
  _format() {
    return this.then((res) => {
      const { latitude, longitude } = res;
      return [latitude, longitude].toString();
    });
  },
  /**
   * Get geolocation's user from cache storage
   * @returns {Promise<userLocationInfo>}
   */
  get() {
    const data = storageManagement.get("userLocation").then((_) => _.value);
    data.format = this._format.bind(data);
    return data;
  },
};

export default locationManagement;
