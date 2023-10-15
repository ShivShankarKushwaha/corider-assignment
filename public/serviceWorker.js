const CACHE_NAME = "version-1";
const urltoCache = ["index.html", "offline.html", './src/App.js', './src/App.jsx', './src/App.ts', './src/App.tsx'];
this.addEventListener("install", (e) =>
{
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
    e.respondWith(
        caches.match(e.request).then((res) =>
        {
            if (res) {
                return res; // Return the cached resource if it exists
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
                        cache.put(e.request, responseToCache); // Cache the fetched response
                    });

                    return response;
                })
                .catch(() => caches.match("offline.html")); // Return the offline page if the network request fails
        }),
    );
});

this.addEventListener("activate", (e) =>
{
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
