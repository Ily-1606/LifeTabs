const estimatedDays = (estimatedTime) => {
  return Math.floor(estimatedTime / 1000 / 60 / 60 / 24);
};
const estimatedHours = (estimatedTime) => {
  return Math.floor((estimatedTime / 1000 / 60 / 60) % 24);
};
const estimatedMinutes = (estimatedTime) => {
  return Math.floor((estimatedTime / 1000 / 60) % 60);
};
const estimatedSeconds = (estimatedTime) => {
  return Math.floor(((estimatedTime / 1000) % 60) % 60);
};

const minuteAgo = (time_start, time_end) => {
  const estimatedTime = time_end - time_start;
  return Math.floor(estimatedTime / 1000 / 60);
};

const timeAgo = (time_start, time_end) => {
  const estimatedTime = Math.max(time_end - time_start, time_start - time_end);
  const days = estimatedDays(estimatedTime);
  const hours = estimatedHours(estimatedTime);
  const mins = estimatedMinutes(estimatedTime);
  const sec = estimatedSeconds(estimatedTime);
  let str;
  if (days > 0) {
    str = `${days < 10 ? "0" + days : days} ngày ${
      hours < 10 ? "0" + hours : hours
    } giờ ${mins < 10 ? "0" + mins : mins} phút ${
      sec < 10 ? "0" + sec : sec
    } giây`;
  } else if (hours > 0) {
    str = `${hours < 10 ? "0" + hours : hours} giờ ${
      mins < 10 ? "0" + mins : mins
    } phút ${sec < 10 ? "0" + sec : sec} giây`;
  } else {
    str = `${mins < 10 ? "0" + mins : mins} phút ${
      sec < 10 ? "0" + sec : sec
    } giây`;
  }
  return str;
};
const countDown = (time_start, time_end) => {
  let str = timeAgo(time_start, time_end);
  if (time_start < time_end) str += " nữa";
  else str += " trước";
  return str;
};
export {
  estimatedDays,
  estimatedHours,
  estimatedMinutes,
  estimatedSeconds,
  countDown,
  timeAgo,
  minuteAgo,
};
