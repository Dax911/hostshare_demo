import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { ResultsCards } from './cards';

const searchClient = algoliasearch('87MROQTWGM', '5da1787cc154b7bbde57ffd5acf84808');

function SearchBarComp() {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_hostdemo2">
      <SearchBox />
      <Hits hitComponent={ResultsCards} />
    </InstantSearch>
  );
}

export default SearchBarComp
