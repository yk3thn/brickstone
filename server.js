// Serves the built site (dist/) on Railway — the same static server as
// before (sirv, with the pre-compressed .br/.gz files), plus one header:
//
// Strict-Transport-Security tells browsers to always use https for
// brickstone.cafe. Railway already redirects http to https; with this,
// a browser that has visited once never even tries http again.
// max-age is one year. To get on the browsers' built-in https-only list
// (hstspreload.org), add "; preload" and submit the domain there.

import { createServer } from "node:http";
import sirv from "sirv";

const HSTS = "max-age=31536000; includeSubDomains";

const serve = sirv("dist", {
  etag: true,
  gzip: true,
  brotli: true,
  setHeaders(res) {
    res.setHeader("Strict-Transport-Security", HSTS);
  },
});

const port = Number(process.env.PORT) || 3000;

createServer((req, res) => {
  serve(req, res, () => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not found");
  });
}).listen(port, "0.0.0.0", () => console.log(`Brickstone on port ${port}`));
