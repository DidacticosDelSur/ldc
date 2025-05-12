import { fetchData } from "./FetchServices";

export async function fetchBrandListData(params = null) {
  return fetchData('brand/getBrand.php', params);
}

export async function fetchBrandData(id) {
  return fetchData('brand/getBrand.php?id=' + id);
}