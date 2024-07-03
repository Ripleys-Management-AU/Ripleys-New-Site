import multer from "multer";
import multerS3 from "multer-s3";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import s3 from "@/config/awsConfig";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME as string,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const filepath = `uploads/test`;
      const fileFormat = path.extname(file.originalname).slice(1);
      const newFileName = uuidv4().replace(/-/g, "").substring(0, 12);
      const newFileNameWithFormat = `${newFileName}.${fileFormat}`;
      (req as any).newFileNameWithFormat = newFileNameWithFormat;
      cb(null, `${filepath}/${newFileNameWithFormat}`);
    },
  }),
});

const uploadMiddleware: any = upload.single("file");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }

  uploadMiddleware(req, res, (err: any) => {
    if (err) {
      return res
        .status(501)
        .json({ error: `Sorry something happened! ${err.message}` });
    }
    const newFileNameWithFormat = (req as any).newFileNameWithFormat;
    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: (req as any).file.location,
      fileName: newFileNameWithFormat,
    });
  });
}
