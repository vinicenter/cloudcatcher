import { generateState } from "arctic";
import { H3Event } from "h3";
import { auth } from "../../../utils/auth";

export default defineEventHandler(async (event: H3Event) => {
	const { github } = auth(event);

	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	setCookie(event, "github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return sendRedirect(event, url.toString());
});
