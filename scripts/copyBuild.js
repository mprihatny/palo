const fs = require('fs');
const path = require('path');

// Copy client build to server public directory
const clientDist = path.join(__dirname, '..', 'client', 'dist');
const serverPublic = path.join(__dirname, '..', 'server', 'public');

// Remove existing public directory
if (fs.existsSync(serverPublic)) {
  fs.rmSync(serverPublic, { recursive: true, force: true });
}

// Copy new build
if (fs.existsSync(clientDist)) {
  fs.cpSync(clientDist, serverPublic, { recursive: true });
  console.log('Frontend build copied to server/public');
} else {
  console.error('Client dist directory not found!');
  process.exit(1);
}
