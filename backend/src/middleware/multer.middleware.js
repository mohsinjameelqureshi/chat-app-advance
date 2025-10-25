import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // store file in memory buffer instead of disk
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
