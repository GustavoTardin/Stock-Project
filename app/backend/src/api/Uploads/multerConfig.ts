import express from 'express';
import multer from 'multer';

interface RequestWithUploadType extends express.Request {
  uploadType?: string;
}

const storage = multer.diskStorage({
  destination: (
    req: RequestWithUploadType,
    _file: Express.Multer.File, 
    callback: (error: Error | null, destination: string) => void,
  ) => {
    let uploadPath = '';

    if (req.uploadType === 'users') {
      uploadPath = 'uploads/users/';
    } else if (req.uploadType === 'store') {
      uploadPath = 'uploads/store/';
    } // Adicione mais casos conforme necessário

    callback(null, uploadPath);
  },
  filename: (
    req: RequestWithUploadType,
    _file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    const { storeName } = req.body;
    const fileName = `${storeName}.png`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;