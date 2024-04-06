import { H3Event } from "h3";
import { auth } from "../../utils/auth";
import { authenticated } from "../../utils/authenticated";

export default defineEventHandler(async (event: H3Event) => {
  const { lucia } = auth(event);

  const { session, user } = await authenticated(event, false);

  if(user) {
    await lucia.invalidateUserSessions(user.id)
  }

  if(session) {
    await lucia.invalidateSession(session.id)
  }

  appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());

  return {
    message: "success"
  }
})
