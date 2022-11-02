import lodash from "lodash";
const lodashPlugin = {
  install(app) {
    app.config.globalProperties.lodash = lodash;
  },
};
export default lodashPlugin;
