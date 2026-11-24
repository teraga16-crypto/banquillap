const C='banquillap-v1',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const keep=res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res};
 if(u.origin===location.origin)e.respondWith(fetch(r).then(keep).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
 else if(u.hostname.indexOf('fonts.')===0)e.respondWith(caches.match(r).then(m=>m||fetch(r).then(keep)));
});
