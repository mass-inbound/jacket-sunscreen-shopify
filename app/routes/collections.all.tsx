import {redirect} from 'react-router';

export async function loader() {
  throw redirect('/collections/shop-all');
}

export default function CollectionsAllRedirect() {
  return null;
}
