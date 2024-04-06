import { paginationSchema } from '~/src/core/server/schemas/pagination-schema'
import { H3Event } from 'h3'
import { and, eq, like, or } from 'drizzle-orm'
import { Devices } from '~/src/core/server/database/schema'

export default defineEventHandler(async (event: H3Event) => {
  const drizzle = event.context.drizzle

  const { user } = await authenticated(event, true)

  const query = paginationSchema.parse(getQuery(event))

  const data = await drizzle
    .select()
    .from(Devices)
    .limit(query.perPage)
    .offset((query.page - 1) * query.perPage)
    .where(
      and(
        eq(Devices.userId, user!.id),
        or(
          query.search ? like(Devices.name, `%${query.search}%`) : undefined,
          query.search ? like(Devices.description, `%${query.search}%`) : undefined,
        )
      )
    )

  const count = await drizzle
    .select()
    .from(Devices)
    .where(
      and(
        eq(Devices.userId, user!.id),
        or(
          query.search ? like(Devices.name, `%${query.search}%`) : undefined,
          query.search ? like(Devices.description, `%${query.search}%`) : undefined,
        )
      )
    )

  return {
    rows: data,
    count: count.length,
    perPage: query.perPage,
    page: query.page
  }
})
