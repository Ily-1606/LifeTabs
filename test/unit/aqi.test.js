import { calcAQI } from "../../src/utils/weather/aqi.js";
test("PM2.5 with C = 26.4 == 81?", () => {
  expect(calcAQI({ key: "pm2_5", value: 26.4 })).toBe(81);
});
test("PM10 with C = 15 == 13?", () => {
  expect(calcAQI({ key: "pm10", value: 15 })).toBe(14);
});
test("NO2 with C = 1 == 1?", () => {
  expect(calcAQI({ key: "no2", value: 1 })).toBe(1);
});
test("CO with C = 0.173 == 2?", () => {
  expect(calcAQI({ key: "co", value: 0.173 })).toBe(2);
});
test("SO2 with C = 1 == 1?", () => {
  expect(calcAQI({ key: "so2", value: 1 })).toBe(1);
});
test("O3 with C = 55 == 24?", () => {
  expect(calcAQI({ key: "o3", value: 26 })).toBe(24);
});
