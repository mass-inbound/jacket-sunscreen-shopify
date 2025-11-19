import {redirect} from '@shopify/remix-oxygen';

export async function loader() {
  throw redirect('/collections/shop-all');
}

export default function CollectionsAllRedirect() {
  return null;
}
