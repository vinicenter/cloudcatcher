import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { GitHub } from "arctic";
import { H3Event } from "h3";
import { Sessions, Users } from "~/src/core/server/database/schema";

export const auth = (event: H3Event) => {
  const drizzle = event.context.drizzle

  const runtimeConfig = useRuntimeConfig(event)

  const adapter = new DrizzleSQLiteAdapter(drizzle, Sessions, Users)

  const luciaInstance = new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: !import.meta.dev
      }
    },
    getUserAttributes: (user) => {
      return {
        githubId: user.github_id,
        username: user.username,
        name: user.name,
        avatar: user.avatar
      };
    }  
  })

  const github = new GitHub(runtimeConfig.GITHUB_CLIENT_ID, runtimeConfig.GITHUB_CLIENT_SECRET);

  return {
    lucia: luciaInstance,
    github
  }
}

declare module "lucia" {
	interface Register {
		Lucia: ReturnType<typeof auth>['lucia'];
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	username: string;
  name: string;
  avatar?: string;
}
