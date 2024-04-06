import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { auth } from "../../../utils/auth";
import { Users } from "~/src/core/server/database/schema";

export default defineEventHandler(async (event) => {
	const drizzle = event.context.drizzle

	const { lucia, github } = auth(event);
	const query = getQuery(event);
	const code = query.code?.toString() ?? null;
	const state = query.state?.toString() ?? null;
	const storedState = getCookie(event, "github_oauth_state") ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		throw createError({
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
				'User-Agent': 'request'
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

    const [ existingUser ] = await drizzle.select().from(Users).where(eq(Users.github_id, githubUser.id))

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
			return sendRedirect(event, "/");
		}

    const [ user ] = await drizzle.insert(Users).values({
      username: githubUser.login,
      github_id: githubUser.id,
			name: githubUser.name || githubUser.login,
			avatar: `https://avatars.githubusercontent.com/u/${githubUser.id}`,
    }).returning();

		const session = await lucia.createSession(user.id, {});
		appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		return sendRedirect(event, "/");
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			throw createError({
				status: 400
			});
		}
		throw createError({
			status: 500
		});
	}
});

interface GitHubUser {
	id: string;
	login: string;
	name: string;
}
