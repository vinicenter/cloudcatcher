import { z } from 'zod'

export const paginationSchema = z.object({
  perPage: z.string().default('20').transform((val) => Number(val)),
  page: z.string().default('1').transform((val) => Number(val)),
  search: z.string().optional(),
})
