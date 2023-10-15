const CACHE_NAME ='version-1';
const urltoCache =['index.html','offline.html'];
this.addEventListener('install',(e)=>
{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache=>
            {
                console.log('caches opened');
                return cache.addAll(urltoCache);
            })
    )
})
this.addEventListener('fetch',(e)=>
{
    e.respondWith(
        caches.match(e.request).then(res=>
            {
                return fetch(e.request).catch(()=>{caches.match('offline.html')})
            })
    )
})

this.addEventListener('activate',(e)=>
{
    const cacheWhiteList=[];
    cacheWhiteList.push(CACHE_NAME);
    e.waitUntil(caches.keys().then(cachenames=>Promise.all(cachenames.map(cachename=>{if(!cacheWhiteList.includes(cachename)){return caches.delete(cachename)}}))))
})