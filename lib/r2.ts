import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Configure the S3 client for Cloudflare R2
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "transmission-assets";

export async function getR2StorageStats() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
    });
    
    const response = await r2Client.send(command);
    
    let totalSize = 0;
    const items = response.Contents || [];
    
    for (const item of items) {
      totalSize += item.Size || 0;
    }
    
    return {
      usedBytes: totalSize,
      itemCount: items.length,
      // R2 doesn't have a hard limit, but we can return the used amount
      formattedUsed: formatBytes(totalSize)
    };
  } catch (error) {
    console.error("Error fetching R2 stats:", error);
    return null;
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
