import { generateState } from "arctic";
import { H3Event } from "h3";
import { useAuth } from "~/server/composables/use-auth";

export default defineEventHandler(async (event: H3Event) => {
	const auth = useAuth(event);

	const state = generateState();
	const url = await auth.github.createAuthorizationURL(state);

	setCookie(event, "github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return sendRedirect(event, url.toString());
});
