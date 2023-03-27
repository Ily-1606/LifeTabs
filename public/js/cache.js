import axios from "./axios";
import locationManagement from "./location";
/**
 * @typedef {Object} dataSaveStorage
 * @property {String} key
 * @property {String} value
 *
 * @typedef {Object} responseData
 * @property {*} data - The main data
 * @property {String} message - The message description's of request
 * @property {Boolean} success - The status of request
 */
const cacheManagement = {
  handlers: {
    astronomy: {
      keySave: "astronomy",
      endPoint: "/weather/astronomy",
      module: "weather",
    },
    currentWeather: {
      keySave: "currentWeather",
      endPoint: "/weather/current",
      module: "weather",
    },
    forecastData: {
      keySave: "forecastData",
      endPoint: "/weather/forecast",
      module: "weather",
    },
    stockData: {
      keySave: "listShares",
      endPoint: "/share/today",
      module: "index",
    },
  },
  CACHE_EXP: 15,
  /**
   * Get weather from action key
   * @abstract
   * @param {String} action
   * @param {Object} params
   */
  async _getWeather(action, { params = {} } = {}) {
    const location = await locationManagement.get().format();
    const handle = axios.get(this.handlers[action].endPoint, {
      params: {
        q: location,
        dt: this._getCurrentDateStr(),
        ...params,
      },
    });
    return handle;
  },
  /**
   * Get data from action key
   * @abstract
   * @param {String} action
   */
  async _getData(action) {
    return axios.get(this.handlers[action].endPoint);
  },
  /**
   * The method save to storage
   * @abstract
   * @param {dataSaveStorage} data
   * @returns {Promise<void>}
   */
  _saveCache(data) {
    const payload = {
      updated_at: new Date().getTime(),
      value: data.value,
      module: this.handlers[data.key].module,
    };
    const key = this.handlers[data.key].keySave;
    const data_saved = {};
    data_saved[key] = payload;
    return chrome.storage.local.set(data_saved);
  },
  /**
   * Get current date string
   * @returns {String}
   */
  _getCurrentDateStr() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  /**
   * Save data if not throw error
   * @param {String} key
   * @param {callbackProcess} cb - Callback convert data
   * @this {Promise}
   *
   * @callback callbackProcess
   * @param {responseData} res
   */
  async saveWillCan(key, cb) {
    const res = await this;
    if (res.success) {
      let payload = res.data;
      if (cb) payload = cb(res);
      cacheManagement._saveCache({
        key,
        value: payload,
      });
    }
  },
  getAstronomy() {
    const handle = this._getWeather("astronomy");
    const cb = (res) => {
      return res.data.astronomy;
    };
    handle.saveWillCan = this.saveWillCan.bind(handle, "astronomy", cb);
    return handle;
  },
  getCurrentWeather() {
    const handle = this._getWeather("currentWeather");
    handle.saveWillCan = this.saveWillCan.bind(handle, "currentWeather");
    return handle;
  },
  getForecastWeather() {
    const handle = this._getWeather("forecastData", { params: { days: 5 } });
    handle.saveWillCan = this.saveWillCan.bind(handle, "forecastData");
    return handle;
  },
  getStock() {
    const handle = this._getData("stockData");
    handle.saveWillCan = this.saveWillCan.bind(handle, "stockData");
    return handle;
  },
  saveWeather() {
    return Promise.allSettled([
      this.getAstronomy().saveWillCan(),
      this.getCurrentWeather().saveWillCan(),
      this.getForecastWeather().saveWillCan(),
    ]);
  },
  saveStock() {
    return this.getStock().saveWillCan();
  },
  saveAll() {
    return Promise.allSettled([this.saveWeather(), this.saveStock()]);
  },
};

export default cacheManagement;
