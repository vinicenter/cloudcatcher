import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { useAuth } from "~/server/composables/use-auth";
import { tables, useDB } from "~/server/composables/use-db";

export default defineEventHandler(async (event) => {
	const auth = useAuth(event);
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
		const tokens = await auth.github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		// Replace this with your own DB client.
    const [ existingUser ] = await useDB().select().from(tables.users).where(eq(tables.users.github_id, githubUser.id))

		if (existingUser) {
			const session = await auth.lucia.createSession(existingUser.id, {});
			appendHeader(event, "Set-Cookie", auth.lucia.createSessionCookie(session.id).serialize());
			return sendRedirect(event, "/");
		}

		const userId = generateId(15);

		// Replace this with your own DB client.
    await useDB().insert(tables.users).values({
      username: githubUser.login,
      github_id: githubUser.id,
			id: userId
    })

		const session = await auth.lucia.createSession(userId, {});
		appendHeader(event, "Set-Cookie", auth.lucia.createSessionCookie(session.id).serialize());
		return sendRedirect(event, "/");
	} catch (e) {
    console.log(e)

		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
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
}
