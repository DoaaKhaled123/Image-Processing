import express from 'express';
import ImgFile from './../../file';

interface ImageData {
  imgfilename?: string;
  imgwidth?: string;
  imgheight?: string;
}

const img_validate = async (query: ImageData): Promise<null | string> => {
  if (!(await ImgFile.isImgAvailable(query.imgfilename))) {
    const availableImgNames: string = (
      await ImgFile.getAvailableImgNames()
    ).join(', ');
    return `Please enter a valid filename in the 'imgfilename' query segment. Filenames are available : ${availableImgNames}.`;
  }
  if (!query.imgwidth && !query.imgheight) {
    return null;
  }
  const imgwidth: number = parseInt(query.imgwidth || '');
  if (Number.isNaN(imgwidth) || imgwidth < 1) {
    return "Please enter a positive numerical value for the 'imgwidth' query segment.";
  }
  const imgheight: number = parseInt(query.imgheight || '');
  if (Number.isNaN(imgheight) || imgheight < 1) {
    return "Please enter a positive numerical value for the 'imgheight' query segment.";
  }
  return null;
};
const images_resize: express.Router = express.Router();
images_resize.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const validationMessage: null | string = await img_validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }
    let error: null | string = '';
    if (!(await ImgFile.isThumbAvailable(request.query))) {
      error = await ImgFile.createThumb(request.query);
    }
    if (error) {
      response.send(error);
      return;
    }
    const path: null | string = await ImgFile.getImgPath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened');
    }
  }
);
export default images_resize;
