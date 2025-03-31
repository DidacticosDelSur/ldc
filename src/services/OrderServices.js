import { createData } from "./FetchServices";

export async function createOrder(data, params =  null) {
  return createData('createOrder.php', data, params);
}