import { File, IncomingForm } from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads/test");

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form: any = new IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) {
        return res.status(500).json({ error: "File upload error" });
      }

      const uploadedFiles = Array.isArray(files.file)
        ? files.file
        : [files.file];

      uploadedFiles.forEach((file: File) => {
        const oldPath = file.filepath;
        const fileExtension = path.extname(file.originalFilename || "");
        const newFilename = `${uuidv4().replace(/-/g, "").substring(0, 12)}${fileExtension}`;
        const newPath = path.join(uploadDir, newFilename);

        try {
          fs.renameSync(oldPath, newPath);
          return res.status(200).json({
            message: "File uploaded successfully",
            fileName: newFilename,
          });
        } catch (err) {
          return res.status(500).json({ error: `error upload files: ${err}` });
        }
      });
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
