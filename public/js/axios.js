/**
 * @typedef {Object} options - The option's of request
 * @property {Object} params - The params's of request
 * @property {Object} headers - The header's of request
 *
 * @typedef {Object} requestConfig - The request config
 * @property {String} method - The method's of request
 * @property {Object|FormData|Buffer|String} data - The data of request
 * @property {Object} params - The params's of request
 * @property {Object} headers - The header's of request
 *
 * @typedef {Object} Interceptor - The config for handle request
 * @property {Function<requestConfig>} send - The config handle before send request
 * @property {Function<Promise>} response - The config handle before return result result
 */

/** @namespace request */
const request = {
  baseURL: () => self.env?.VITE_APP_API_URL,
  interceptor: {
    /**
     * Set config before send request
     * @name configSendInterceptor
     * @param {requestConfig} config
     * @returns {requestConfig}
     */
    send(config) {
      return config;
    },
    response(res) {
      return res;
    },
  },
  /**
   * The method GET of request
   * @protected
   * @param {URL} url - The url's of request
   * @param {options} options
   * @returns {Promise<Response>} - The result of request
   */
  get(url, options = {}) {
    const _url = this._buildUrl(url);
    return this._send({
      url: _url,
      method: "GET",
      params: options.params,
      headers: options.headers,
    });
  },
  /**
   * The method POST of request
   * @protected
   * @param {String} url - The url's of request
   * @param {options} options
   * @returns {Promise<Response>} - The result of request
   */
  post(url, data = {}, options = {}) {
    const _url = this._buildUrl(url);
    return this._send({
      url: _url,
      method: "POST",
      data,
      params: options.params,
      headers: options.headers,
    });
  },
  /**
   * The method build url
   * @abstract
   * @param {String} url
   * @returns {URL|String}
   */
  _buildUrl(url) {
    let _url;
    try {
      _url = new URL(url);
    } catch (e) {
      _url = new URL(this.baseURL());
      _url.pathname += url;
    }
    return _url;
  },
  /**
   * Build request and send
   * @abstract
   * @param {requestConfig} config
   * @returns {Promise<Response<JSON|String>}
   */
  _send({ url, method = "GET", data = {}, params = {}, headers = {} } = {}) {
    const _config = {
      method,
      headers,
    };
    if (method != "GET" && method != "HEAD") _config.body = data;
    const config = this.interceptor.send(_config);
    url.search = new URLSearchParams(params).toString();
    return fetch(url.href, config)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json"))
          return res.json();
        else return res.text();
      })
      .then((res) => this.interceptor.response(res));
  },
};

/**
 *  @param {requestConfig} config
 * @returns {requestConfig}
 */
request.interceptor.send = (config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${self.env.user_token}`,
  };
  return config;
};

export default request;
