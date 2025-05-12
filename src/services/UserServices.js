
import { createData, editData, fetchData } from "./FetchServices";

/* export async function fetchUserListData(type = null, params = null) {
  switch (type) {
    case 'c': return fetchData('getCliente.php', params);
    case 'v': return fetchData('getVendedor.php')
    case 'a': return fetchData('getAdministrador.php')
    default: return fetchData('getClientesVendedores.php')
  }
}
 */
export async function fetchUserData(id, type) {
  switch (type) {
    case 'v': return fetchData('getVendedor.php?id=' + id);
    case 'a': return fetchData('getAdministrador.php?id=' + id);
    default: return fetchData('getCliente.php?id=' + id);
  }
}

export async function createUser(data,type) {
  return createData('createCliente.php',data);
}

export async function editUserProfile(id,data) {
  return editData('editUserProfile.php', id, data);
}

export function fetchSellerData(client) {
  return fetchData('getSellerByClient.php?client='+client);
}
/* export async function editUserData(id, data,type) {
  switch (type) {
    case 'c': return editData('editCliente.php' , id, data);
    case 'v': return editData('editVendedor.php', id, data);
    case 'a': return editData('editAdministrador.php', id, data);
  }
}

export async function removeUser(id, type) {
  switch (type) {
    case 'c': return fetchData('deleteCliente.php?id=' + id);
    case 'v': return fetchData('deleteVendedor.php?id=' + id);
    case 'a': return fetchData('deleteAdministrador.php?id=' + id);
  }
}
 */
export async function userLogin(data, params = null) {
  return createData('login.php', data, params);
}