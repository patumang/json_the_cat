const request = require('request');
const isJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.log("Invalid Input! Input 1 Breed Name!");
  process.exit();
}

request(`https://api.thecatapi.com/v1/breeds/search?name=${args[0]}`, (error, response, body) => {

  if (error) {
    console.log('error:', error); // Print the error if one occurred
    process.exit();
  }

  if (response && response.statusCode > 400) {
    console.log('API error : Failed to get data!'); // Print the error if one occurred
    process.exit();
  }

  if (!isJson(body)) {
    console.log('Response is not in JSON format!');
    process.exit();
  }

  const data = JSON.parse(body);

  if (data.length === 0) {
    console.log("No breed found!");
    process.exit();
  }
  console.log(`${args[0]} Description:`);
  console.log(data[0].description);

  //console.log(typeof data);
});