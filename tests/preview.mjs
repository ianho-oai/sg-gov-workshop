// Browser QA uses an unmistakably fake key and never reads local credentials.
import {createServer} from 'node:http';
import {Readable} from 'node:stream';
import worker from '../dist/server/index.js';
import {fixture} from './key-fixture.mjs';
const origin='http://127.0.0.1:3005', {env}=fixture(origin);
createServer(async(req,res)=>{
 try{
  const request=new Request(new URL(req.url,origin),{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Readable.toWeb(req),duplex:'half'}:{})});
  const result=await worker.fetch(request,env);res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));
 }catch{res.writeHead(500);res.end('Preview error');}
}).listen(3005,'127.0.0.1',()=>console.log('Fake-key QA preview at '+origin));
