import { fetchData } from "./FetchServices";

export async function fetchCarouselListData(params = null) {
  return fetchData('carousel/getItems.php', params);
}