import { UnprocessableEntityException } from "@nestjs/common";
import { extname } from "path";

export const validFileFilter = (req, file, callback) => {
    if (!extname(file.originalname).match(/\.(csv|geojson)$/)) {
      return callback(new UnprocessableEntityException('Only CSV and GeoJSON files are allowed!'), false);
    }
    callback(null, true);
  };

  export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };
  
