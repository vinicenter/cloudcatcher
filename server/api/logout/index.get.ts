import { H3Event } from "h3";
import { useAuth } from "~/server/composables/use-auth";
import { useAuthenticated } from "~/server/composables/use-authenticated";

export default defineEventHandler(async (event: H3Event) => {
  const auth = useAuth(event);

  const authenticated = await useAuthenticated(event, false);

  if(authenticated.user) {
    await auth.lucia.invalidateUserSessions(authenticated.user.id)
  }

  if(authenticated.session) {
    await auth.lucia.invalidateSession(authenticated.session.id)
  }

  appendHeader(event, "Set-Cookie", auth.lucia.createBlankSessionCookie().serialize());

  return {
    message: "success"
  }
})
