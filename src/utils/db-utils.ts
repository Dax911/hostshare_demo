import algoliasearch, { SearchClient } from 'algoliasearch';
import fetch from 'node-fetch';
import { env } from "../../src/env/server.mjs";
import { Root, Daum } from '../types/data.js';

// replace this with the URL where your JSON data is hosted
const url = 'https://file.notion.so/f/s/24643894-e5c3-4c40-974a-52594f581e03/listings.json?id=f795dab6-14d4-48a9-9567-c72151d311a2&table=block&spaceId=f2ea7328-64a4-4f18-bacc-df6c9ac3d888&expirationTimestamp=1685572181920&signature=uIZ-BbQOjffH9d2wjmWd_Acn4FSHBc-LSs1oyZ_AsMU&downloadName=listings.json';

const client: SearchClient = algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex('hostdemo');


interface AlgoliaRecord extends Daum {
  _geoloc: {
    lat: number;
    lng: number;
  };
}

async function fetchData() {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json() as Root;

      // Ensure data and data.data exist
      if (!data || !data.data) {
          throw new Error("Invalid data received");
      }

      const records: AlgoliaRecord[] = data.data.map((record: Daum): AlgoliaRecord => {
        return {
          ...record,
          objectID: record.info.id,
          _geoloc: {
            lat: record.info.location.lat,
            lng: record.info.location.long,
          },
        };
      });

      // Push the records to your Algolia index
      return index.saveObjects(records);
  } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
  }
}

fetchData().then((res) => {
  if (res) {
      console.log(res);
  } else {
      console.log("No data fetched");
  }
}).catch((err) => console.error(err));
