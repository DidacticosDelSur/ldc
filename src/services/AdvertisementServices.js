import { fetchData } from "./FetchServices";

export async function fetchAdvertisementList() {
  return fetchData('advertisement/getAdvertisement.php')
}