self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pos-v1').then((cache) => {
      // โหลดไฟล์ 2 ตัวนี้เก็บไว้ในเครื่อง
      return cache.addAll(['index.html', 'manifest.json']); 
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // ถ้าไม่มีเน็ต ให้เอาของที่โหลดเก็บไว้มาแสดงแทน
      return response || fetch(event.request);
    })
  );
});