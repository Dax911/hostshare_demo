import { env } from '../../env/client.mjs';
import { Daum } from '../../types/data.js';
import { GetServerSidePropsContext } from 'next';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';

interface Hit extends Daum {
  objectID: string;
}
// ...

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  if (!params || typeof params.id !== 'string') {
    // If params or params.id is not available, return notFound or some default props
    return { notFound: true };
  }

  const objectID: string = params.id;
  const searchClient = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_APP_ID, env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);
  const index: SearchIndex = searchClient.initIndex('hostdemo');

  try {
    const hit = await (index as any).getObject(objectID);
    return {
      props: {
        hit,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

function PropertyPage({ hit }: { hit: Hit }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{hit.info.title}</h1>
      <img src={hit.info.mainImage.url} className="w-full h-48 object-cover rounded-md" />
      <p className="text-md font-thin">{hit.info.location.city}</p>
      <p className="text-md">{hit.info.ratings.guestSatisfactionOverall}</p>
      {/* add other data here */}
    </div>
  );
}

export default PropertyPage;
