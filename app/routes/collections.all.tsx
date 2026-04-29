import {redirect, type LoaderFunctionArgs} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  throw redirect(`/collections/shop-all${url.search}`);
}

export default function CollectionsAllRedirect() {
  return null;
}
