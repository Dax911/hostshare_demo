import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch-dom';
import { GoogleMapsLoader, GeoSearch, Marker } from 'react-instantsearch-dom-maps';
import 'instantsearch.css/themes/algolia.css';
import { env } from '../env/client.mjs';
import { Daum } from '../types/data';

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

interface Hit extends Daum{
  objectID: string;
  _geoloc: {
    lat: number;
    lng: number;
  };

}


const Hit = ({ hit }: any) => (
  <div>
    <p>{hit.info.title}</p>
  </div>
);

const MapWithSearch = () => (
  <div className="grid grid-cols-4 h-screen gap-4">
    <div className="col-span-1 p-6">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </div>
    <div className="col-span-3 relative">
      <GoogleMapsLoader apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
        {(google: any) => (
          <GeoSearch google={google}>
            {({ hits }: any) => hits.map((hit: { objectID: string | number | null | undefined; }) => <Marker key={hit.objectID} hit={hit} />)}
          </GeoSearch>
        )}
      </GoogleMapsLoader>
    </div>
  </div>
);




const SearchPage = () => (
  <InstantSearch indexName="hostdemo" searchClient={searchClient}>
    <Configure aroundLatLngViaIP />
    <MapWithSearch />
  </InstantSearch>
);

export default SearchPage;
