import {
  estimatedDays,
  estimatedHours,
  estimatedMinutes,
  estimatedSeconds,
} from "../../src/utils/event.js";

test("Next 7 days", () => {
  const currentTime = new Date().getTime();
  const futureTime = currentTime + 1000 * 60 * 60 * 24 * 7; // Next 7 days
  const estimatedTime = futureTime - currentTime;
  expect(estimatedDays(estimatedTime)).toBe(7);
  expect(estimatedHours(estimatedTime)).toBe(0);
  expect(estimatedMinutes(estimatedTime)).toBe(0);
  expect(estimatedSeconds(estimatedTime)).toBe(0);
});
test("Next 6 days 59 mins", () => {
  const currentTime = new Date().getTime();
  const futureTime = currentTime + 1000 * 60 * 60 * 24 * 6 + 59 * 1000 * 60;
  const estimatedTime = futureTime - currentTime;
  expect(estimatedDays(estimatedTime)).toBe(6);
  expect(estimatedHours(estimatedTime)).toBe(0);
  expect(estimatedMinutes(estimatedTime)).toBe(59);
  expect(estimatedSeconds(estimatedTime)).toBe(0);
});

test("Next 1 days 3h 30m 49s", () => {
  const currentTime = new Date().getTime();
  const futureTime =
    currentTime +
    1000 * 60 * 60 * 24 * 1 +
    1000 * 60 * 60 * 3 +
    30 * 1000 * 60 +
    1000 * 49;
  const estimatedTime = futureTime - currentTime;
  expect(estimatedDays(estimatedTime)).toBe(1);
  expect(estimatedHours(estimatedTime)).toBe(3);
  expect(estimatedMinutes(estimatedTime)).toBe(30);
  expect(estimatedSeconds(estimatedTime)).toBe(49);
});

test("Next 0 days 6h 45 mins 10s", () => {
  const currentTime = new Date().getTime();
  const futureTime =
    currentTime + 1000 * 60 * 60 * 6 + 45 * 1000 * 60 + 1000 * 10;
  const estimatedTime = futureTime - currentTime;
  expect(estimatedDays(estimatedTime)).toBe(0);
  expect(estimatedHours(estimatedTime)).toBe(6);
  expect(estimatedMinutes(estimatedTime)).toBe(45);
  expect(estimatedSeconds(estimatedTime)).toBe(10);
});

test("Next 80 days 12h 59 mins 0s", () => {
  const currentTime = new Date().getTime();
  const futureTime =
    currentTime +
    1000 * 60 * 60 * 24 * 80 +
    1000 * 60 * 60 * 12 +
    59 * 1000 * 60;
  const estimatedTime = futureTime - currentTime;
  expect(estimatedDays(estimatedTime)).toBe(80);
  expect(estimatedHours(estimatedTime)).toBe(12);
  expect(estimatedMinutes(estimatedTime)).toBe(59);
  expect(estimatedSeconds(estimatedTime)).toBe(0);
});
