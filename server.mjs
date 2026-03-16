import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleResumeAssistantRequest } from './src/server/resumeAssistantHandler.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 8787);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (requestUrl.pathname === '/api/resume-assistant') {
    const body = await new Promise((resolve, reject) => {
      let raw = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        raw += chunk;
      });
      req.on('end', () => resolve(raw));
      req.on('error', reject);
    });

    const response = await handleResumeAssistantRequest(
      new Request(`http://localhost:${port}${requestUrl.pathname}`, {
        method: req.method,
        headers: req.headers,
        body: req.method === 'POST' ? body : undefined,
      })
    );

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      Readable.fromWeb(response.body).pipe(res);
      return;
    }

    res.end();
    return;
  }

  let filePath = path.join(distDir, requestUrl.pathname === '/' ? 'index.html' : requestUrl.pathname.slice(1));
  if (!existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const extension = path.extname(filePath).toLowerCase();
  res.setHeader('Content-Type', mimeTypes[extension] || 'application/octet-stream');

  if (extension === '.html') {
    res.end(await readFile(filePath));
    return;
  }

  createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
});
