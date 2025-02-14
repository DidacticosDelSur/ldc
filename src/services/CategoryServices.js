import { fetchData } from "./FetchServices";

export async function fetchCategoryListData(params = null) {
  return fetchData('getCategoria.php', params);
}

export async function fetchCategoryData(id) {
  return fetchData('getCategoria.php?id=' + id);
}
