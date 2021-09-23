const request = require('request');

const isJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

const fetchBreedDescription = (breedName, callback) => {

  request(`https://api.thecatapi.com/v1/breeds/search?name=${breedName}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response && response.statusCode > 400) {
      callback('API error : Failed to get data!', null);
      return;
    }

    if (!isJson(body)) {
      callback('Response is not in JSON format!', null);
      return;
    }

    const data = JSON.parse(body);

    if (data.length === 0) {
      callback('No breed found!', null);
      return;
    }
    callback(null, data[0].description);
  });
};

module.exports = { fetchBreedDescription };