import { array, boolean, object, parse, picklist, string } from 'valibot'
import Badge from '../components/badge.tsx'

const ProblemSchema = object({
	result: array(object({
		'difficulty': picklist(['easy', 'medium', 'hard']),
		'free': boolean(),
		'group': string(),
		'id': string(),
		'name': string(),
		'problem_link': string(),
		'solution_walkthrough': string(),
	})),
})

export default async function Home() {
	const response = await fetch('https://nfjx7ug3qec76hujjep5wyjeya0bvovn.lambda-url.ap-south-1.on.aws/')
	const data = await response.json()

	const parsedData = parse(ProblemSchema, data)

	return (
		<main class='px-4 my-16 max-w-screen-md mx-auto'>
			<h1 class='text-4xl font-bold text-center text-balance'>The Blind 75 Coding Interview Questions</h1>
			<p class='text-stone-500 text-center mt-2 text-lg'>
				A comprehensive list of the most common coding interview questions.
			</p>

			<ul aria-label='List of problems' class='space-y-4 mt-8'>
				{parsedData.result.map((problem, index) => (
					<li class='rounded-lg flex justify-between font-medium gap-4 shadow-sm hover:shadow transition-shadow duration-300 bg-stone-50 p-4'>
						<a href={problem.problem_link} target='_blank' rel='noreferrer'>
							{index + 1}. {problem.name}
						</a>

						<div class='flex gap-2 h-min'>
							<Badge className='capitalize' variant={problem.difficulty}>{problem.difficulty}</Badge>

							<a
								href={problem.solution_walkthrough}
								target='_blank'
								title="Checkout problem's solution"
								rel='noreferrer'
							>
								<svg
									class='size-7'
									xmlns='http://www.w3.org/2000/svg'
									width='100'
									height='100'
									viewBox='0 0 50 50'
								>
									<path d='M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z'>
									</path>
								</svg>
							</a>
						</div>
					</li>
				))}
			</ul>
		</main>
	)
}
