import { fetchData } from "./FetchServices";

export function fetchTagData(id) {
  return fetchData('tag/getTag.php?id='+id)
}