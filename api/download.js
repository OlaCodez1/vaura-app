// api/download.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  // Latest APK release URL
  const url = "https://github.com/OlaCodez1/vaura-app/releases/latest/download/vaura.apk";

  const response = await fetch(url, {
    headers: { "User-Agent": "Vaura-Proxy" }
  });

  if (!response.ok) {
    res.status(response.status).send("Error fetching file");
    return;
  }

  res.setHeader("Content-Type", "application/vnd.android.package-archive");
  res.setHeader("Content-Disposition", "attachment; filename=vaura.apk");
  
  // Pipe the file stream directly
  response.body.pipe(res);
}
