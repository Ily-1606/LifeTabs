const estemateDays = (estemateTime) => {
  return Math.floor(estemateTime / 1000 / 60 / 60 / 24);
};
const estemateHours = (estemateTime) => {
  return Math.floor((estemateTime / 1000 / 60 / 60) % 24);
};
const estemateMinutes = (estemateTime) => {
  return Math.floor((estemateTime / 1000 / 60) % 60);
};
const estemateSeconds = (estemateTime) => {
  return Math.floor(((estemateTime / 1000) % 60) % 60);
};

const countDown = (time_start, time_end) => {
  const estemateTime = Math.max(time_end - time_start, 0);
  const days = estemateDays(estemateTime);
  const hours = estemateHours(estemateTime);
  const mins = estemateMinutes(estemateTime);
  const sec = estemateSeconds(estemateTime);
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
  str += " nữa";
  return str;
};
export {
  estemateDays,
  estemateHours,
  estemateMinutes,
  estemateSeconds,
  countDown,
};
