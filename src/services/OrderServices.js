import { createData, fetchData } from "./FetchServices";

export async function createOrder(data, params =  null) {
  return createData('order/createOrder.php', data, params);
}

export async function getOrders(params = null) {
  return fetchData('order/getOrder.php', params);
}

export function fetchOrderStates() {
  return fetchData('order/getOrderStates.php');
}

export async function getOrder(params = null) {
  return fetchData('order/getOrder.php',params)
}