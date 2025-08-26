import { editData, fetchData } from "./FetchServices";

export async function fetchCartData(params = null) {
  return fetchData('cart/getCart.php', params);
}

export async function updateCartData(clientId, data) {
  return editData('cart/updateCart.php', clientId, data);
}

export async function removeItem(params) {
  return fetchData('cart/deleteItemCart.php', params);
}