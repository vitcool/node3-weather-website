const request = require('request');

const WEATHER_URL = 'https://api.darksky.net/forecast';

const WEATHER_TOKEN = 'd91b0361449dafb34d13703b84d56185';

const forecast = (lat, lon, callback) => {
  const meteoUrl = `${WEATHER_URL}/${WEATHER_TOKEN}/${lat},${lon}?units=si&lang=uk`;
  request({ url: meteoUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else {
      const responseBody = response.body;
      const { currently, daily, error } = responseBody;
      if (error) {
        callback('Unable to find location');
      } else {
        const { temperature, precipProbability } = currently;
        const message = `${daily.data[0].summary} It is currently ${temperature} desgees out. There is a ${precipProbability}% chance of rain`;
        callback(undefined, message);
      }
    }
  });
}

module.exports = forecast;
