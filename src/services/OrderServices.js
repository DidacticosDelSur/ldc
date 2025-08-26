import { createData, fetchData } from "./FetchServices";

export async function createOrder(data, params =  null) {
  return createData('order/createOrder.php', data, params);
}

export async function getOrders(params = null) {
  return fetchData('order/getOrder.php', params);
}

export async function getOrder(id) {
  return fetchData('order/getOrder.php?id='+id)
}