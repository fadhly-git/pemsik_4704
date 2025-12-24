const fs = require('fs');
const path = require('path');

const dbFolder = path.join(__dirname, 'db');
const dbFile = path.join(__dirname, 'db.json');

// Middleware untuk sync db.json ke file-file individual setelah setiap perubahan
const syncMiddleware = (req, res, next) => {
  // Simpan fungsi json asli
  const originalJson = res.json;

  // Override fungsi json untuk menangkap response
  res.json = function(data) {
    // Panggil fungsi json asli
    const result = originalJson.call(this, data);

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
      }, 100); // Delay kecil untuk memastikan db.json sudah ditulis oleh json-server
    }

    return result;
  };

  next();
};

module.exports = syncMiddleware;
