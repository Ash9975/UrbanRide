import multer from "multer";
import DatauriParser from "datauri/parser.js";

const storage = multer.memoryStorage();

// ✅ Upload multiple images (max 3)
export const multerUploads = multer({ storage }).array("images", 3);

// ⚠️ Kept for compatibility (if used anywhere)
export const multerMultipleUploads = multer({ storage }).array("images", 3);

// ⚠️ Kept parser (even if unused, to avoid breaking imports)
const parser = new DatauriParser();

// ⚠️ Old function (kept for compatibility)
export const dataUri = (req) => {
  if (!req.files || req.files.length === 0) return [];

  const encodedFiles = [];

  req.files.forEach((cur) => {
    const base64 = Buffer.from(cur.buffer).toString("base64");

    const base64CloudinaryFormat = `data:${cur.mimetype};base64,${base64}`;

    encodedFiles.push({
      data: base64CloudinaryFormat,
      filename: cur.originalname,
    });
  });

  return encodedFiles;
};

// ✅ MAIN function (use this in controllers)
export const base64Converter = (req) => {
  if (!req.files || req.files.length === 0) return [];

  return req.files.map((cur) => {
    const base64 = Buffer.from(cur.buffer).toString("base64");

    return {
      data: `data:${cur.mimetype};base64,${base64}`,
      filename: cur.originalname,
    };
  });
};