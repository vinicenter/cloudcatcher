import { H3Event } from "h3";
import { authenticated } from "../../utils/authenticated";

export default defineEventHandler(async (event: H3Event) => {
  const userData = await authenticated(event, true)

  return userData.user
})
