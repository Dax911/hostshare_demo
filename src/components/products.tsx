import algoliasearch from 'algoliasearch';

// initialize the client with your Algolia application ID and secret API key
const client = algoliasearch('87MROQTWGM', '5da1787cc154b7bbde57ffd5acf84808');

// initialize the index
const index = client.initIndex('dev_hostdemo2');

// the location data from Next.js response
const lat = 'latitude'; // replace 'latitude' with the actual latitude
const lng = 'longitude'; // replace 'longitude' with the actual longitude

// fetch all items sorted by distance to specific location
index.search('', {
  aroundLatLng: `${lat},${lng}`,
  hitsPerPage: 1000, // adjust this to your needs
})
.then(({ hits }) => {
  console.log(hits);
})
.catch(err => {
  console.error(err);
});
