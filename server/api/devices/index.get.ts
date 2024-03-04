import { paginationSchema } from '~/server/schemas/pagination-schema'
import { H3Event } from 'h3'
import { and, eq, like, or } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const { user } = await authenticated(event, true)

  const query = paginationSchema.parse(getQuery(event))

  const data = await useDrizzle()
    .select()
    .from(tables.devices)
    .limit(query.perPage)
    .offset((query.page - 1) * query.perPage)
    .where(
      and(
        eq(tables.devices.userId, user!.id),
        or(
          query.search ? like(tables.devices.name, `%${query.search}%`) : undefined,
          query.search ? like(tables.devices.description, `%${query.search}%`) : undefined,
        )
      )
    )

  const count = await useDrizzle()
    .select()
    .from(tables.devices)
    .where(
      and(
        eq(tables.devices.userId, user!.id),
        or(
          query.search ? like(tables.devices.name, `%${query.search}%`) : undefined,
          query.search ? like(tables.devices.description, `%${query.search}%`) : undefined,
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
