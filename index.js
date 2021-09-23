const { fetchBreedDescription } = require('./breedFetcher');

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.log("Invalid Input! Input 1 Breed Name!");
  process.exit();
}

const breedName = args[0];

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(`${breedName} Description:`);
    console.log(desc);
  }
});