import { type PageProps } from '$fresh/server.ts'

export default function App({ Component }: PageProps) {
	return (
		<html lang='en'>
			<head>
				<meta charset='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>Blind 75</title>
				<meta name='description' content='A comprehensive list of the most common coding interview questions.' />
				<link rel='stylesheet' href='/styles.css' />
			</head>
			<body class='bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100'>
				<Component />
			</body>
		</html>
	)
}
