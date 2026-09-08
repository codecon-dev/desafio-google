// Servidor de desenvolvimento com livereload (sem dependencias).
// Uso: node dev-server.mjs  ->  http://localhost:3000
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const LIVERELOAD_SNIPPET = `
<script>
  (function () {
    let es;
    function connect() {
      es = new EventSource('/__livereload');
      es.addEventListener('reload', function (e) {
        if (e.data === 'css') {
          document.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
            const url = new URL(link.href, location.href);
            url.searchParams.set('__t', Date.now());
            link.href = url.href;
          });
        } else {
          location.reload();
        }
      });
      es.onerror = function () {
        es.close();
        setTimeout(connect, 1000);
      };
    }
    connect();
  })();
</script>
`;

/** @type {Set<import('node:http').ServerResponse>} */
const clients = new Set();

function broadcast(kind) {
  for (const res of clients) {
    res.write(`event: reload\ndata: ${kind}\n\n`);
  }
}

// --- watcher ---
let timer = null;
let pendingCssOnly = true;

function scheduleReload(file) {
  if (path.extname(file) !== '.css') pendingCssOnly = false;
  clearTimeout(timer);
  timer = setTimeout(() => {
    const kind = pendingCssOnly ? 'css' : 'full';
    pendingCssOnly = true;
    console.log(`[livereload] ${kind} -> ${clients.size} cliente(s)`);
    broadcast(kind);
  }, 50);
}

fs.watch(ROOT, { recursive: true }, (_event, filename) => {
  if (!filename) return;
  if (filename.startsWith('.git') || filename.includes('node_modules')) return;
  if (filename.endsWith('~') || filename.startsWith('.')) return;
  scheduleReload(filename);
});

// --- servidor ---
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let filePath = path.join(ROOT, decodeURIComponent(url.pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1>' + LIVERELOAD_SNIPPET);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' };

  if (ext === '.html') {
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.includes('</body>')
      ? html.replace('</body>', LIVERELOAD_SNIPPET + '</body>')
      : html + LIVERELOAD_SNIPPET;
    res.writeHead(200, headers).end(html);
    return;
  }

  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n  Servidor rodando em http://localhost:${PORT}`);
  console.log(`  Livereload ativo (CSS troca sem recarregar a pagina)\n`);
});
