import axios from "axios";
import fs from "fs";
const OUTPUT = "./src/utils/weather/condition-code.json";
axios
  .get("https://www.weatherapi.com/docs/conditions.json")
  .then(({ data }) => {
    return data.map((cond) => {
      delete cond.languages;
      return cond;
    });
  })
  .then((cond) => {
    fs.writeFileSync(OUTPUT, JSON.stringify(cond, null, 2));
  });
