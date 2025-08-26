import { createData } from "./FetchServices"

export async function sendMessageToAdmin(data) {
  return createData('admin/sendMessage.php',data)
}