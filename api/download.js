// /api/download.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const githubOwner = 'OlaCodez1';
    const githubRepo = 'vaura-app';
    const assetName = 'vaura-v1.0.0.apk';
    const latestTag = 'v1.0.0-pre';

    const downloadUrl = `https://github.com/${githubOwner}/${githubRepo}/releases/download/${latestTag}/${assetName}`;

    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error('Failed to fetch APK');

    res.setHeader('Content-Disposition', `attachment; filename="${assetName}"`);
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');

    // Stream the response to the client
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to download APK.' });
  }
}
