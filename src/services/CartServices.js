import { editData, fetchData } from "./FetchServices";

export async function fetchCartData(params = null) {
  return fetchData('getCarrito.php', params);
}

export async function updateCartData(clientId, data) {
  return editData('updateCarrito.php', clientId, data);
}

export async function removeItem(params) {
  return fetchData('deleteItemCart.php', params);
}