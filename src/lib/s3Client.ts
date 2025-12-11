import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket_name = "mascottebucket";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  file: Buffer,
  filename: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucket_name,
    Key: `Uploads/${filename}`,
    Body: file,
    ContentType: "image/*",
  });
  await s3Client.send(command);
  return filename;
}

export async function getSignedS3Url(filename: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket_name,
    Key: `Uploads/${filename}`,
  });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
