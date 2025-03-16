export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method == 'POST') {
			const data: { name: string; age: number } = await request.json();
			console.log(data);
			return new Response(`Hello ${data.name}!`);
		}
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
