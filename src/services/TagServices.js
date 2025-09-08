import { fetchData } from "./FetchServices";

export async function fetchTagList(params = null) {
  return fetchData('tag/getTag.php',params);
}

export function fetchTagData(id) {
  return fetchData('tag/getTag.php?id='+id)
}