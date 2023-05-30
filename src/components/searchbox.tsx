import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { ResultsCards } from './cards';

const searchClient = algoliasearch('87MROQTWGM', '5da1787cc154b7bbde57ffd5acf84808');

const Hits = ({ hits }) => (
  <div className="space-y-4">
    {hits.map(hit => (
      <div key={hit.objectID} className="p-4 border rounded-md">
        {/* Customize this div as needed */}
        <p className="text-lg font-semibold">{hit.info.title}</p>
      </div>
    ))}
  </div>
);

const CustomHits = connectHits(Hits);

function SearchBarComp() {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_hostdemo2">
      <SearchBox />
      <CustomHits/>
    </InstantSearch>
  );
}

export default SearchBarComp
