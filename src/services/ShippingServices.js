import { fetchData } from "./FetchServices";

export async function getShippingData(params =  null) {
  return fetchData('getUserShipping.php', params);
}