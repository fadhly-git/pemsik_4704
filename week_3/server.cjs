const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const dbFolder = path.join(__dirname, 'db');
const dbFile = path.join(__dirname, 'db.json');

// Serve frontend static files from /dist when available, otherwise use default middlewares
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  server.use(jsonServer.defaults({ static: distPath }));
  console.log('Serving frontend from', distPath);
} else {
  server.use(middlewares);
}

// Gunakan body parser
server.use(jsonServer.bodyParser);

// Middleware untuk sync ke file individual setelah setiap perubahan
server.use((req, res, next) => {
  // Simpan fungsi json asli
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  // Override res.json
  res.json = function(data) {
    syncToFiles(req);
    return originalJson(data);
  };

  // Override res.send
  res.send = function(data) {
    syncToFiles(req);
    return originalSend(data);
  };

  next();
});

function syncToFiles(req) {
  // Jika method adalah POST, PUT, PATCH, atau DELETE, sync ke file individual
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    setTimeout(() => {
      try {
        // Baca db.json yang sudah diupdate oleh json-server
        const dbContent = fs.readFileSync(dbFile, 'utf-8');
        const db = JSON.parse(dbContent);

        // Tulis setiap collection ke file individual
        Object.keys(db).forEach(collection => {
          const filePath = path.join(dbFolder, `${collection}.json`);
          fs.writeFileSync(filePath, JSON.stringify(db[collection], null, 2));
        });

        console.log(`✓ Synced db.json to individual files after ${req.method} ${req.path}`);
      } catch (err) {
        console.error('Error syncing to individual files:', err);
      }
    }, 100);
  }
}

// Mount API router under /api so frontend can proxy requests
server.use('/api', router);

// If frontend build exists, ensure SPA fallback to index.html for non-API routes
if (fs.existsSync(distPath)) {
  server.get('*', (req, res) => {
    const indexHtml = path.join(distPath, 'index.html');
    if (fs.existsSync(indexHtml)) {
      res.sendFile(indexHtml);
    } else {
      res.status(404).send('Not found');
    }
  });
}

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log('Auto-sync to individual files is enabled');
});
