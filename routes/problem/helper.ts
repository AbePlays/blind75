import { extract } from '$std/front_matter/yaml.ts'
import { join } from '$std/path/mod.ts'
import { parse } from 'valibot'

import { MarkdownSchema, Problem } from './types.ts'

export async function getProblem(slug: string): Promise<Problem> {
	const text = await Deno.readTextFile(join('./problems', `${slug}.md`))
	const { attrs, body } = extract(text)

	const parsedData = parse(MarkdownSchema, attrs)

	return {
		slug,
		description: parsedData.description,
		title: parsedData.title,
		published_at: parsedData.published_at,
		content: body,
	}
}

export async function getProblems(): Promise<Problem[]> {
	const files = Deno.readDir('./problems')
	const promises = []
	for await (const file of files) {
		const slug = file.name.replace('.md', '')
		promises.push(getProblem(slug))
	}

	const posts = await Promise.all(promises)
	posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime())
	return posts
}
