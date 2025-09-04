// api/download.js
export default async function handler(req, res) {
  const githubUrl = "https://github.com/OlaCodez1/vaura-app/releases/download/v1.0.0-pre/vaura-v1.0.0.apk";

  try {
    const response = await fetch(githubUrl);

    if (!response.ok) {
      res.status(response.status).send("Failed to fetch APK from GitHub");
      return;
    }

    // Stream the file to the client
    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader("Content-Disposition", 'attachment; filename="vaura.apk"');

    // Pipe the remote response directly to the client
    response.body.pipe(res);

  } catch (err) {
    console.error("Download mirror error:", err);
    res.status(500).send("Server error while fetching APK");
  }
}
