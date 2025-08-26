import { fetchData } from "./FetchServices";

export async function getShippingData(params =  null) {
  return fetchData('user/getShipping.php', params);
}