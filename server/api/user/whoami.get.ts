import { H3Event } from "h3";
import { useAuthenticated } from "~/server/composables/use-authenticated";

export default defineEventHandler(async (event: H3Event) => {
  const authentication = await useAuthenticated(event, true)

  return {
    ...authentication.user
  }
})
