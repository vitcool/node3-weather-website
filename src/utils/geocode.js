const request = require('request');

const GEOLOCATION_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const GEOLOCATION_TOKEN = 'pk.eyJ1Ijoidml0Y29vbCIsImEiOiJjazV1NjZmeGQwZHY5M2RwY3JvcnR0d2VkIn0.KiU-bN3PC3j7w9d5Q6CHoQ';

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const geolocationUrl = `${GEOLOCATION_URL}/${encodedAddress}.json?limit=1&access_token=${GEOLOCATION_TOKEN}`;

  request({ url: geolocationUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location service');
    } else {
      const responseBody = response.body;
      const { features } = responseBody;
      if (features.length) {
        const firstPlace = features[0];
        const { center, place_name } = firstPlace;
        const [lon, lat]= center;
        callback(undefined, { lat, lon, location: place_name });
      } else {
        callback('Unable to connect to find this place');
      }
    }
  })
}

module.exports = geocode;