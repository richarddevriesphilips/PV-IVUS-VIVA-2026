const { app, BrowserWindow } = require("electron");
const path = require("path");
const http = require("http");
const fs = require("fs");

let mainWindow;
let server;

const PORT = 17834;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// dist/ mounted at "/" plus one sub-app mount per vendored Intrasight build.
const MOUNTS = [
  { prefix: "/intrasight-distant-future", dir: path.join(__dirname, "..", "dist", "intrasight-distant-future") },
  { prefix: "/intrasight", dir: path.join(__dirname, "..", "dist", "intrasight") },
  { prefix: "", dir: path.join(__dirname, "..", "dist") },
];

function sendFile(filePath, stats, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || "application/octet-stream";

  const range = req.headers.range;
  if (range && (ext === ".mp4" || ext === ".mov")) {
    const size = stats.size;
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": mime,
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": mime, "Content-Length": stats.size });
    fs.createReadStream(filePath).pipe(res);
  }
}

function sendSpaFallback(dir, res) {
  const indexPath = path.join(dir, "index.html");
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

// Serves `dir` for requests under `prefix`, falling back to that dir's
// index.html for unmatched paths (client-side routing / SPA support).
function serveMount({ dir }, subPath, req, res) {
  const filePath = path.join(dir, subPath === "/" ? "index.html" : subPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendSpaFallback(dir, res);
      return;
    }
    sendFile(filePath, stats, req, res);
  });
}

function createWindow() {
  server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);

    const mount = MOUNTS.find((m) => m.prefix === "" || urlPath.startsWith(m.prefix));
    const subPath = mount.prefix ? urlPath.slice(mount.prefix.length) || "/" : urlPath;

    serveMount(mount, subPath, req, res);
  });

  server.listen(PORT, "127.0.0.1", () => {
    console.log(`Serving on http://127.0.0.1:${PORT}`);

    mainWindow = new BrowserWindow({
      width: 3840,
      height: 2160,
      fullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    mainWindow.loadURL(`http://127.0.0.1:${PORT}`);

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (server) server.close();
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
