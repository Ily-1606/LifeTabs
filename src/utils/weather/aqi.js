const dictionaryAQI = [
  {
    aqi: {
      from: 0,
      to: 50,
    },
    no2: {
      from: 0,
      to: 53,
    },
    so2: {
      from: 0,
      to: 35,
    },
    co: {
      from: 0,
      to: 4.4,
    },
    pm10: {
      from: 0,
      to: 54,
    },
    pm2_5: {
      from: 0,
      to: 12,
    },
    o3: {
      from: 0,
      to: 54,
    },
  },
  {
    aqi: {
      from: 51,
      to: 100,
    },
    no2: {
      from: 54,
      to: 100,
    },
    so2: {
      from: 36,
      to: 75,
    },
    co: {
      from: 4.5,
      to: 9.4,
    },
    pm10: {
      from: 55,
      to: 154,
    },
    pm2_5: {
      from: 12.1,
      to: 35.4,
    },
    o3: {
      from: 55,
      to: 70,
    },
  },
  {
    aqi: {
      from: 101,
      to: 150,
    },
    no2: {
      from: 101,
      to: 360,
    },
    so2: {
      from: 76,
      to: 185,
    },
    co: {
      from: 9.5,
      to: 12.4,
    },
    pm10: {
      from: 155,
      to: 254,
    },
    pm2_5: {
      from: 35.5,
      to: 55.4,
    },
    o3: {
      from: 71,
      to: 85,
    },
  },
  {
    aqi: {
      from: 151,
      to: 200,
    },
    no2: {
      from: 361,
      to: 649,
    },
    so2: {
      from: 186,
      to: 304,
    },
    co: {
      from: 12.5,
      to: 15.4,
    },
    pm10: {
      from: 255,
      to: 354,
    },
    pm2_5: {
      from: 55.5,
      to: 150.4,
    },
    o3: {
      from: 86,
      to: 105,
    },
  },
  {
    aqi: {
      from: 201,
      to: 300,
    },
    no2: {
      from: 650,
      to: 1249,
    },
    so2: {
      from: 305,
      to: 604,
    },
    co: {
      from: 15.5,
      to: 30.4,
    },
    pm10: {
      from: 355,
      to: 424,
    },
    pm2_5: {
      from: 150.5,
      to: 250.4,
    },
    o3: {
      from: 106,
      to: 200,
    },
  },
  {
    aqi: {
      from: 301,
      to: 400,
    },
    no2: {
      from: 1250,
      to: 1649,
    },
    so2: {
      from: 605,
      to: 804,
    },
    co: {
      from: 30.5,
      to: 40.4,
    },
    pm10: {
      from: 425,
      to: 504,
    },
    pm2_5: {
      from: 250.5,
      to: 350.4,
    },
    o3: {
      from: null,
      to: null,
    },
  },
  {
    aqi: {
      from: 401,
      to: 500,
    },
    no2: {
      from: 1650,
      to: 2049,
    },
    so2: {
      from: 805,
      to: 1004,
    },
    co: {
      from: 40.5,
      to: 50.4,
    },
    pm10: {
      from: 505,
      to: 604,
    },
    pm2_5: {
      from: 350.5,
      to: 500.4,
    },
    o3: {
      from: null,
      to: null,
    },
  },
];

const listTitleAlerts = [
  {
    title: "Tuyệt vời",
    point_range: { from: 0, to: 19 },
    description:
      "Chất lượng không lý lý tưởng cho hầu hết đối tượng; hãy tận hưởng các hoạt động ngoài trời bình thường.",
  },
  {
    title: "Vừa phải",
    point_range: { from: 20, to: 49 },
    description:
      "Chất lượng không khí mở mức chấp nhận được đối với hầu hết đối tượng. Tuy nhiên, ở các nhóm đối tượng nhạy cảm có thể sẽ xuất hiện triệu chứng từ nhẹ đến trung bình nếu tiếp xúc quá lâu.",
  },
  {
    title: "Xấu",
    point_range: { from: 50, to: 99 },
    description:
      "Không khí đã đạt mức ô nhiễm cao và không phù hợp với các nhóm đối tượng nhạy cảm. Hãy giảm thời gian ở bên ngoài nếu cơ thể xuất hiện các triệu chứng như khó thở hay ngứa cổ.",
  },
  {
    title: "Có hại",
    point_range: { from: 100, to: 149 },
    description:
      "Các nhóm đối tượng nhạy cảm có thể cảm nhận được tác động đến sức khỏe ngay lập tức. Các đối tượng khỏe mạnh có thể gặp tình trạng khó thở và ngứa cổ nếu tiếp xúc lâu. Hãy giới hạn hoạt động ngoài trời.",
  },
  {
    title: "Rất có hại",
    point_range: { from: 150, to: 249 },
    description:
      "Các nhóm đối tượng nhạy cảm sẽ cảm nhận được tác động đến sức khỏe ngay lập tức và nên tránh hoạt động ngoài trời. Các đối tượng khỏe mạnh nhiều khả năng sẽ gặp tình trạng khó thở và ngứa cổ, hãy cân nhắc việc ở trong nhà và dời lịch cho các hoạt động ngoài trời.",
  },
  {
    title: "Nguy hiểm",
    point_range: { from: 250 },
    description:
      "Mọi tiếp xúc với không khí, dù chỉ vài phút, cũng có thể dẫn đến tác động nghiêm trọng đến sức khỏe đối với mọi đối tượng. Hãy tránh các hoạt động ngoài trời.",
  },
];

const calcAQI = ({ key, value }) => {
  const calc = ({ IHight, ILow, CHight, CLow, C }) => {
    const I = ((IHight - ILow) / (CHight - CLow)) * (C - CLow) + ILow;
    return Math.round(I);
  };
  let result = 0;
  for (let data of dictionaryAQI) {
    if (data[key].from <= value && value <= data[key].to) {
      const IHight = data.aqi.to;
      const ILow = data.aqi.from;
      const CHight = data[key].to;
      const CLow = data[key].from;
      const C = value;
      const aqiObject = {
        IHight,
        ILow,
        CHight,
        CLow,
        C,
      };
      result = calc(aqiObject);
      break;
    }
  }
  return result;
};

const getRangeAIQ = (value = 0) => {
  return listTitleAlerts.findIndex(({ point_range }) => {
    return point_range.from <= value && value <= point_range.to;
  });
};

export { dictionaryAQI, calcAQI, listTitleAlerts, getRangeAIQ };
