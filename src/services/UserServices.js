
import { createData, editData, fetchData } from "./FetchServices";

export async function fetchUserData(id, type) {
  switch (type) {
    case 'v': return fetchData('seller/getSeller.php?id=' + id);
    default: return fetchData('client/getClient.php?id=' + id);
  }
}
export async function createUser(data,type) {
  return createData('client/createClient.php',data);
}
export async function editUserProfile(id,data) {
  return editData('user/editProfile.php', id, data);
}
export async function editUserPassword(id, data) {
  return editData('user/updatePassword.php',id,data)
}
export function fetchSellerData(client) {
  return fetchData('seller/getSellerByClient.php?client='+client);
}
export async function userLogin(data, params = null) {
  return createData('user/login.php', data, params);
}
export async function recoverPassword(data) {
  return fetchData('user/recoverPassword.php?email='+data)
}