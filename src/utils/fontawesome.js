import { Config, VueFontAwesome } from "@ily1606/vue-font-awesome-pro";
import { faCircleExclamation } from "@ily1606/pro-regular-svg-fontawesome";
import {
  faCaretLeft,
  faSpinnerThird,
} from "@ily1606/pro-solid-svg-fontawesome";
import {
  faClouds,
  faLeaf,
  faSunBright,
  faMoon,
  faHouseUser,
  faCloudSunRain,
  faKeyboard,
  faGear,
  faCalendar,
} from "@ily1606/pro-light-svg-fontawesome";
const icons = {
  faCircleExclamation,
  faCaretLeft,
  faClouds,
  faLeaf,
  faSunBright,
  faMoon,
  faHouseUser,
  faCloudSunRain,
  faKeyboard,
  faGear,
  faCalendar,
  faSpinnerThird,
};
const setup = (app) => {
  app.use(Config, icons);
  app.component("VueFontAwesome", VueFontAwesome);
};
export { setup };
