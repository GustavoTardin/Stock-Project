// import { log } from 'console';
import express from 'express';
import multer from 'multer';
import path from 'path';
// import CustomError from '../Errors/CustomError';

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
    const { uploadtype } = req.headers;
    if (uploadtype === 'users') {
      uploadPath = 'uploads/users/';
    } else if (uploadtype === 'store') {
      uploadPath = path.join(__dirname, 'stores');
    } // Adicione mais casos conforme necessário

    callback(null, uploadPath);
  },
  filename: (
    req: RequestWithUploadType,
    _file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    const { name } = req.body;
    const fileName = `${name.replace(/\s+/g, '')
    }.png`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;