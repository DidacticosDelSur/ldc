import { fetchData } from "./FetchServices";

export async function fetchCityListData(id) {
  return fetchData('getLocalidad.php?id=' + id);
}

export async function fetchProvinceListData() {
  return fetchData('getProvincia.php');
}

export async function fetchCityClientsListData() {
  return fetchData('getLocalidadClientes.php');
}