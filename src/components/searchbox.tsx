import algoliasearch from "algoliasearch/lite";
import { InstantSearch, connectHits } from "react-instantsearch-dom";
import { Hit as AlgoliaHit } from "react-instantsearch-core";
import { Daum } from "../types/data";
import Link from "next/link";
import { env } from "../env/client.mjs";

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

// Define a new interface that extends Daum and AlgoliaHit
interface Hit extends Daum, AlgoliaHit<unknown> {}

const CustomHits = connectHits<Hit>(({ hits }) => (
  <div className="grid p-2 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {hits.map(hit => (
      <div key={hit.objectID} className="p-2">
        <HitItem hit={hit} />
      </div>
    ))}
  </div>
));

const HitItem = ({ hit }: { hit: Hit }) => (
  <div className="rounded-md border p-4">
    <Link href={`/property/${hit.objectID}`}>
      <div>
        <p className="text-lg font-semibold">{hit.info.title}</p>
      </div>
      <div>
        <img
          src={hit.info.mainImage.url}
          className="h-48 w-full rounded-md object-cover"
        />
      </div>
      <div>
        <p className="text-md font-thin">{hit.info.location.city}</p>
      </div>
      <div>
        <p className="text-md">{hit.info.ratings.guestSatisfactionOverall}</p>
      </div>
      {/* add other data here */}
    </Link>
  </div>
);

function SearchBarComp() {
  return (
    <InstantSearch searchClient={searchClient} indexName="hostdemo">
      <CustomHits />
    </InstantSearch>
  );
}

export default SearchBarComp;
