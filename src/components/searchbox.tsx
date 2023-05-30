import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { Daum } from '../types/data';

const searchClient = algoliasearch('87MROQTWGM', '5da1787cc154b7bbde57ffd5acf84808');
interface Props {
  hits: Daum[];
}
const Hits: React.FC<Props> = ({ hits }) => (
  <div className="space-y-4">
    {hits.map(hit => (
      <div key={hit.objectID} className="p-4 border rounded-md">
        {/* Customize this div as needed */}
        <p className="text-lg font-semibold">{hit.info.title}</p>

        {/* Display the image, assuming hit.info.image is a URL to an image */}
        <img src={hit.info.mainImage.url} className="w-full h-48 object-cover rounded-md" />




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
