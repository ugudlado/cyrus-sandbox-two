import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/app.js";

let server;
let base;
before(async () => {
	server = createServer();
	await new Promise((r) => server.listen(0, r));
	base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test("GET / returns the app name", async () => {
	const res = await fetch(`${base}/`);
	assert.equal(res.status, 200);
	assert.deepEqual(await res.json(), { name: "cyrus-sandbox-two" });
});

test("unknown path returns 404", async () => {
	const res = await fetch(`${base}/nope`);
	assert.equal(res.status, 404);
});
