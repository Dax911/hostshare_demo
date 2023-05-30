import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits as BaseHits } from 'react-instantsearch-dom';
import { Daum } from '../types/data';

const searchClient = algoliasearch('87MROQTWGM', '5da1787cc154b7bbde57ffd5acf84808');

// Define a new interface that extends Daum
interface Hit extends Daum {
  objectID: string;
}

const Hits = () => (
  <BaseHits hitComponent={HitItem} />
);

const HitItem = ({ hit }: { hit: Hit }) => (
  <div className="space-y-4">
    <div key={hit.objectID} className="p-4 border rounded-md">
      <p className="text-lg font-semibold">{hit.info.title}</p>
      <img src={hit.info.mainImage.url} className="w-full h-48 object-cover rounded-md" />
      <p className="text-md font-thin">{hit.info.location.city}</p>
    </div>
  </div>
);

function SearchBarComp() {
  return (
    <InstantSearch searchClient={searchClient} indexName="hostdemo">
      <SearchBox />
      <Hits/>
    </InstantSearch>
  );
}

export default SearchBarComp;
