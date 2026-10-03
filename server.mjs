import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const base=path.resolve('dist');
const port=Number(process.argv[2]||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer(async(req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(base,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(base+path.sep)){res.writeHead(403).end();return}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'}).end(data)}catch{res.writeHead(404).end('Not found')}}).listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+port));
