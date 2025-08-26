import { editData, fetchData } from "./FetchServices";

export async function fetchProductListData(params = null) {
  return fetchData('product/getProduct.php', params);
}

export async function fetchProductByTag(params = null) {
  return fetchData('product/getProduct.php', params);
}
export async function fetchProductData(id) {
  return fetchData('product/getProduct.php?id=' + id);
}

export async function addProductToCart(data, clientId) {
  return editData('product/addToCart.php',clientId, data);
}