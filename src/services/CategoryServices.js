import { fetchData } from "./FetchServices";

export async function fetchCategoryListData(params = null) {
  return fetchData('category/getCategory.php', params);
}

export async function fetchCategoryData(id) {
  return fetchData('category/getCategory.php?id=' + id);
}
