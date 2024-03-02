import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { auth } from "~/server/utils/auth";
import { tables, useDrizzle } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
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

    const [ existingUser ] = await useDrizzle().select().from(tables.users).where(eq(tables.users.github_id, githubUser.id))

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
			return sendRedirect(event, "/");
		}

		const userId = generateId(15);
    await useDrizzle().insert(tables.users).values({
      username: githubUser.login,
      github_id: githubUser.id,
			name: githubUser.name || githubUser.login,
			avatar: `https://avatars.githubusercontent.com/u/${githubUser.id}`,
			id: userId
    })

		const session = await lucia.createSession(userId, {});
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
