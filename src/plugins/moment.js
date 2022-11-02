import moment from "moment";
const momentPlugin = {
  install(app) {
    app.config.globalProperties.moment = moment;
  },
};
export default momentPlugin;
