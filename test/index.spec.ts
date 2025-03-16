// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('worker', () => {
	it('responds with Hello World!', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toBe(`Hello World!`);
	});
});
