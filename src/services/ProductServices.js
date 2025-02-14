import { fetchData } from "./FetchServices";

export async function fetchProductListData(params = null) {
  return fetchData('getProducto.php', params);
}

export async function fetchProductByTag(tag) {
  return fetchData('getProducto.php?tag=' + tag);
}
export async function fetchProductData(id) {
  return fetchData('getProducto.php?id=' + id);
}

