export interface Notice {
	id: number;
	url: string;
	title: string;
	date: string;
	files: File[];
	links: Link[];
	is_external: boolean;
	created_at: Date;
}

export interface Link {
	label: string;
	url: string;
}

export interface File {
	label: string;
	src: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const apiKey = request.headers.get('X-API-Key');

		if (apiKey === env.API_KEY) {
			if (request.method.toUpperCase() === 'POST') {
				return await POST(request, env, ctx);
			}
			return new Response('Hello World!');
		}

		return new Response('Forbidden', { status: 403 });
	},
} satisfies ExportedHandler<Env>;

async function POST(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	const url = new URL(request.url);
	if (url.pathname.includes('/update-trigger')) {
		const key = ((await request.json()) as { key: string }).key;
		if (!key) {
			return new Response('Bad Request', { status: 400 });
		}

		let updates: Notice[] = [];
		try {
			updates = JSON.parse((await env.KV.get(key)) || '[]');
		} catch (error) {
			return new Response('Oops! something went wrong.', { status: 400 });
		}

		if (updates.length) return new Response('Not found', { status: 404 });

		console.log(key);
		console.log(updates);
	}

	return Response.json({}, { status: 200 });
}
