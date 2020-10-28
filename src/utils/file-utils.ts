import { extname } from "path";

export const validFileFilter = (req, file, callback) => {
    if (!extname(file.originalname).match(/\.(csv|geojson)$/)) {
      return callback(new Error('Only CSV and GeoJSON files are allowed!'), false);
    }
    callback(null, true);
  };
   