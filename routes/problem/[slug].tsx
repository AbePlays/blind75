import { Handlers, PageProps } from '$fresh/server.ts'
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

import { getProblem } from './helper.ts'
import { Problem } from './types.ts'
import { Head } from '$fresh/runtime.ts'

const md = MarkdownIt()
md.use(
	await Shiki({
		langs: ['ts'],
		themes: {
			light: 'one-light',
			dark: 'poimandres',
		},
	}),
)

export const handler: Handlers<Problem> = {
	async GET(_req, ctx) {
		const post = await getProblem(ctx.params.slug)
		if (post === null) return ctx.renderNotFound()
		return ctx.render(post, {
			headers: {
				'cache-control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
			},
		})
	},
}

export default function PostPage(props: PageProps<Problem>) {
	const post = props.data

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.description} key='description' />
			</Head>
			<main class='max-w-screen-md px-4 pt-16 mx-auto'>
				<h1 class='text-5xl font-bold'>{post.title}</h1>
				<time class='opacity-65 mt-2 block' dateTime={post.published_at.toISOString()}>
					{new Date(post.published_at).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				<div
					class='my-8 prose prose-stone dark:prose-invert'
					dangerouslySetInnerHTML={{ __html: md.render(post.content) }}
				/>
			</main>
		</>
	)
}
