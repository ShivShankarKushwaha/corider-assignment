const CACHE_NAME = "version-1";
const urltoCache = ["index.html", "offline.html", './src/App.js', './src/App.jsx', './src/App.ts', './src/App.tsx', 'https://qa.corider.in/assignment/chat?page=1'];
this.addEventListener("install", (e) =>
{
    console.log('installing');
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
        {
            console.log("caches opened");
            return cache.addAll(urltoCache);
        }),
    );
});
this.addEventListener("fetch", (e) =>
{
    console.log('fetching');
    e.respondWith(
        caches.match(e.request).then((res) =>
        {
            if (res) {
                return res; 
            }
            return fetch(e.request)
                .then((response) =>
                {
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME).then((cache) =>
                    {
                        cache.put(e.request, responseToCache); 
                    });

                    return response;
                })
                .catch(() => caches.match("offline.html")); 
        }),
    );
});

this.addEventListener("activate", (e) =>
{
    console.log('activating');
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    e.waitUntil(
        caches.keys().then((cachenames) =>
            Promise.all(
                cachenames.map((cachename) =>
                {
                    if (!cacheWhiteList.includes(cachename)) {
                        return caches.delete(cachename);
                    }
                }),
            ),
        ),
    );
});
