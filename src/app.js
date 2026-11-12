import http from "node:http";

export function handle(req, res) {
	if (req.method === "GET" && req.url === "/") {
		res.writeHead(200, { "content-type": "application/json" });
		res.end(JSON.stringify({ name: "cyrus-sandbox-two" }));
		return;
	}
	if ((req.method === "GET" || req.method === "HEAD") && req.url === "/health") {
		res.writeHead(200, { "content-type": "application/json" });
		res.end(req.method === "HEAD" ? undefined : JSON.stringify({ ok: true }));
		return;
	}
	res.writeHead(404, { "content-type": "application/json" });
	res.end(JSON.stringify({ error: "not found" }));
}

export function createServer() {
	return http.createServer(handle);
}
