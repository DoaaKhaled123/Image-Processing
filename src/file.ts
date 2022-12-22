import { promises as fs } from 'fs';
import path from 'path';
import processImage from './image_processing';

interface ImageData {
  imgfilename?: string;
  imgwidth?: string;
  imgheight?: string;
}

export default class ImgFile {
  static imgFullPath = path.resolve(__dirname, '../assets/images/full');
  static imgThumbPath = path.resolve(__dirname, '../assets/images/thumb');
  static async getImgPath(params: ImageData): Promise<null | string> {
    if (!params.imgfilename) {
      return null;
    }
    const imgfilePath: string =
      params.imgwidth && params.imgheight
        ? path.resolve(
          ImgFile.imgThumbPath,
            `${params.imgfilename}-${params.imgwidth}x${params.imgheight}.jpg`
          )
        : path.resolve(ImgFile.imgFullPath, `${params.imgfilename}.jpg`);
    try {
      await fs.access(imgfilePath);
      return imgfilePath;
    } catch {
      return null;
    }
  }
  static async isImgAvailable(imgfilename: string = ''): Promise<boolean> {
    if (!imgfilename) {
      return false; 
    }

    return (await ImgFile.getAvailableImgNames()).includes(imgfilename);
  }
  static async getAvailableImgNames(): Promise<string[]> {
    try {
      return (await fs.readdir(ImgFile.imgFullPath)).map(
        (imgfilename: string): string => imgfilename.split('.')[0]
      );
    } catch {
      return [];
    }
  }
  static async isThumbAvailable(params: ImageData): Promise<boolean> {
    if (!params.imgfilename || !params.imgwidth || !params.imgheight) {
      return false; 
    }
    const filePath: string = path.resolve(
      ImgFile.imgThumbPath,
      `${params.imgfilename}-${params.imgwidth}x${params.imgheight}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(ImgFile.imgThumbPath);
    } catch {
      fs.mkdir(ImgFile.imgThumbPath);
    }
  }
  static async createThumb(params: ImageData): Promise<null | string> {
    if (!params.imgfilename || !params.imgwidth || !params.imgheight) {
      return null; 
    }
    const imgfilePathFull: string = path.resolve(
      ImgFile.imgFullPath,
      `${params.imgfilename}.jpg`
    );
    const imgfilePathThumb: string = path.resolve(
      ImgFile.imgThumbPath,
      `${params.imgfilename}-${params.imgwidth}x${params.imgheight}.jpg`
    );
    console.log(`Creating thumb ${imgfilePathThumb}`);
    return await processImage({
      imgsource: imgfilePathFull,
      imgtarget: imgfilePathThumb,
      imgwidth: parseInt(params.imgwidth),
      imgheight: parseInt(params.imgheight)
    });
  }
}
