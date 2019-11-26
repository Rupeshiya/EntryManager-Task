const STATIC_CACHE_NAME = 'static-cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-name-v1';
const filesToCache = [
  '/index.html',
  './app/components/**.html',
  './app/components/**.ts',
  './app/**.html',
  './offline.html'
];

// for install event
self.addEventListener('install',function(event){
  console.log('installing service worker');
  event.waitUntill(
    caches.open(STATIC_CACHE_NAME)
      .then((cache)=>{
        cache.addAll(filesToCache);
      })
      .catch((err)=>{
        console.log('error in sw.js',err);
      })
  );
})

// for activating the service worker
self.addEventListener('activate',function(event){
  console.log('activating the service worker');
  event.waitUntill(
    caches.keys() // will return all the sub caches name i.e array of strings
      .then(function(keyList){
        // keyList is an array of sub caches names
        return Promise.all(keyList.map(function(key){
          if(key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME){
            console.log('[service worker] removing',key);
            caches.delete(key);
          }
        }));
      })
  )
})

// for fetching the request
self.addEventListener('fetch',function(event){
  console.log('fetching the data');
  event.respondWith(
    caches.match(event.request)
      .then((res)=>{
        if(res){
          return fetch(event.request)
          .then((res)=>{
            // store dynamic caching
            return caches.open(DYNAMIC_CACHE_NAME)
              .then((cache)=>{
                cache.put(event.request.url,res.clone())
                  return res;
              })
          })
        }
      })
      .catch((err)=>{
        caches.open(STATIC_CACHE_NAME)
        .then(function(cache){
          console.log('offline.html caching');
          // will check for offline page and then return it
          if(event.request.header.get('accept').includes('text/html')){
            return cache.match('/offline.html');
          }
        })
      })
  )
})

//