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
		<div class='px-4 py-8'>
			<div class='max-w-screen-md mx-auto flex flex-col items-center justify-center'>
				<h1 class='text-4xl font-bold'>Welcome to Blind75</h1>
				<h2 class='text-left font-medium my-2'>Total Problems: {parsedData.result.length}</h2>

				<ul class='space-y-2 mt-4 list-decimal'>
					{parsedData.result.map((problem) => (
						<li>
							<a href={problem.problem_link} target='_blank' rel='noreferrer'>{problem.name}</a>
							<div>
								<span>Difficulty: {problem.difficulty}</span>
								<a class='block w-max' href={problem.solution_walkthrough} target='_blank' rel='noreferrer'>
									Solution Walkthrough
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
