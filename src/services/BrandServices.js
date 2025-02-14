import { fetchData } from "./FetchServices";

export async function fetchBrandListData(params = null) {
  return fetchData('getMarca.php', params);
}

export async function fetchBrandData(id) {
  return fetchData('getMarca.php?id=' + id);
}