import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { GitHub } from "arctic";
import { H3Event } from "h3";
import { tables, useDB } from "./db";

const adapter = new DrizzleSQLiteAdapter(useDB(), tables.sessions, tables.users)

export const auth = (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event)

  const luciaInstance = new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: !import.meta.dev
      }
    },
    getUserAttributes: (attributes) => {
      return {
        githubId: attributes.github_id,
        username: attributes.username
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
}