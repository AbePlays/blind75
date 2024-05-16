import { date, Input, object, string } from 'valibot'

export const MarkdownSchema = object({
	description: string(),
	published_at: date(),
	title: string(),
})

export type Problem = Input<typeof MarkdownSchema> & { content: string; slug: string }
