/**
 * @typedef {Object} StorageProvider - The storage provider
 * @property {getFromStorage} get - The data from storage
 * @property {setToStorage} set - Set data to storage
 *
 * @callback getFromStorage
 * @param {String[]}
 * @returns {Promise<Object>}
 *
 * @callback setToStorage
 * @param {Object}
 * @returns {Promise<Object>}
 *
 * @typedef {Object} objectChanged
 * @property {dataChange} *
 *
 * @typedef {Object} dataChange
 * @property {String} oldValue
 * @property {String} newValue
 */

const storageManagement = {
  /**
   * @type {StorageProvider}
   * @const
   */
  provider: chrome.storage.local,
  /**
   * @type {String} - The area of storage watch to change
   * @const
   */
  area: "local",
  /**
   * Get data from storage
   * @param {String} key
   * @returns {Promise<Object>}
   */
  get(key) {
    return this.provider.get([key]).then((res) => res[key]);
  },
  /**
   * Add handle to watch change storage area
   * @param {String} key - The key to watch change in the area
   * @param {Function} cb - The callback
   * @returns {Function}
   */
  onChange(key, cb) {
    /**
     *
     * @param {objectChanged} changes - The data change
     * @param {String} area The area changed
     */
    const callback = (changes, area) => {
      if (area === this.area && changes[key]) {
        cb(changes[key]);
      }
    };
    chrome.storage.onChanged.addListener(callback);
    return callback;
  },
};

export default storageManagement;
