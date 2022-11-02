import {
  estemateDays,
  estemateHours,
  estemateMinutes,
  estemateSeconds,
} from "../../src/utils/event.js";

test("Next 7 days", () => {
  const currentTime = new Date().getTime();
  const futureTime = currentTime + 1000 * 60 * 60 * 24 * 7; // Next 7 days
  const estemateTime = futureTime - currentTime;
  expect(estemateDays(estemateTime)).toBe(7);
  expect(estemateHours(estemateTime)).toBe(0);
  expect(estemateMinutes(estemateTime)).toBe(0);
  expect(estemateSeconds(estemateTime)).toBe(0);
});
test("Next 6 days 59 mins", () => {
  const currentTime = new Date().getTime();
  const futureTime = currentTime + 1000 * 60 * 60 * 24 * 6 + 59 * 1000 * 60;
  const estemateTime = futureTime - currentTime;
  expect(estemateDays(estemateTime)).toBe(6);
  expect(estemateHours(estemateTime)).toBe(0);
  expect(estemateMinutes(estemateTime)).toBe(59);
  expect(estemateSeconds(estemateTime)).toBe(0);
});

test("Next 1 days 3h 30m 49s", () => {
  const currentTime = new Date().getTime();
  const futureTime =
    currentTime +
    1000 * 60 * 60 * 24 * 1 +
    1000 * 60 * 60 * 3 +
    30 * 1000 * 60 +
    1000 * 49;
  const estemateTime = futureTime - currentTime;
  expect(estemateDays(estemateTime)).toBe(1);
  expect(estemateHours(estemateTime)).toBe(3);
  expect(estemateMinutes(estemateTime)).toBe(30);
  expect(estemateSeconds(estemateTime)).toBe(49);
});

test("Next 0 days 6h 45 mins 10s", () => {
  const currentTime = new Date().getTime();
  const futureTime =
    currentTime + 1000 * 60 * 60 * 6 + 45 * 1000 * 60 + 1000 * 10;
  const estemateTime = futureTime - currentTime;
  expect(estemateDays(estemateTime)).toBe(0);
  expect(estemateHours(estemateTime)).toBe(6);
  expect(estemateMinutes(estemateTime)).toBe(45);
  expect(estemateSeconds(estemateTime)).toBe(10);
});

test("Next 80 days 12h 59 mins 0s", () => {
  const currentTime = new Date().getTime();
  const futureTime =
    currentTime +
    1000 * 60 * 60 * 24 * 80 +
    1000 * 60 * 60 * 12 +
    59 * 1000 * 60;
  const estemateTime = futureTime - currentTime;
  expect(estemateDays(estemateTime)).toBe(80);
  expect(estemateHours(estemateTime)).toBe(12);
  expect(estemateMinutes(estemateTime)).toBe(59);
  expect(estemateSeconds(estemateTime)).toBe(0);
});
