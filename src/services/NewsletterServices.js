import { createData } from "./FetchServices"

export function addToNewletter (data) {
  return createData('newsletter/add.php',data);
}