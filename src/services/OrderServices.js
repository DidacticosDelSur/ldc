import { createData, fetchData } from "./FetchServices";

export async function createOrder(data, params =  null) {
  return createData('createOrder.php', data, params);
}

export async function getOrders(params = null) {
  return fetchData('getOrders.php', params);
}

export async function getOrder(id) {
  return fetchData('getOrders.php?id='+id)
}