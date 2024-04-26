import { array, boolean, object, parse, string } from 'valibot'

const ProblemSchema = object({
	result: array(object({
		'difficulty': string(),
		'free': boolean(),
		'id': string(),
		'name': string(),
		'problem_link': string(),
		'solution_walkthrough': string(),
		'group': string(),
	})),
})

export default async function Home() {
	const response = await fetch('https://nfjx7ug3qec76hujjep5wyjeya0bvovn.lambda-url.ap-south-1.on.aws/')
	const data = await response.json()

	const parsedData = parse(ProblemSchema, data)

	return (
		<div class='px-4 my-16 max-w-screen-md mx-auto'>
			<h1 class='text-4xl font-bold text-center text-balance'>The Blind 75 Coding Interview Questions</h1>
			<p class='text-stone-500 text-center mt-2 text-lg'>
				A comprehensive list of the most common coding interview questions.
			</p>

			<h2 class='text-left font-medium my-2'>Total Problems: {parsedData.result.length}</h2>

			<ul class='space-y-4 mt-4'>
				{parsedData.result.map((problem) => (
					<li>
						<details class='group [&_summary::-webkit-details-marker]:hidden'>
							<summary class='flex font-medium cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-stone-50 p-4'>
								{problem.name}
								<svg
									class='size-5 shrink-0 transition duration-300 group-open:-rotate-180'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
								</svg>
							</summary>

							<div class='mt-4 px-4 text-stone-700'>
								<a href={problem.problem_link} target='_blank' rel='noreferrer'>Try out problem on Leetcode</a>
								<div>
									<span>Difficulty: {problem.difficulty}</span>
									<a class='block w-max' href={problem.solution_walkthrough} target='_blank' rel='noreferrer'>
										<svg
											class='w-6 h-6'
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
							</div>
						</details>
					</li>
				))}
			</ul>
		</div>
	)
}
