import { fetchData } from "./FetchServices";

export async function fetchCityListData(id) {
  return fetchData('location/getCity.php?id=' + id);
}

export async function fetchProvinceListData() {
  return fetchData('location/getProvince.php');
}