import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { ResultsCards } from './cards';

const searchClient = algoliasearch('87MROQTWGM', '5da1787cc154b7bbde57ffd5acf84808');
export function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p>
    </article>
  );
}
function SearchBarComp() {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_hostdemo2">
      <SearchBox />
      <Hits hitComponent={ResultsCards} />
    </InstantSearch>
  );
}

export default SearchBarComp
