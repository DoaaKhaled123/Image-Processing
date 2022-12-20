import express from 'express';
import File from './../../file';

interface Image {
  filename?: string;
  width?: string;
  height?: string;
}

const img_validate = async (query: Image): Promise<null | string> => {
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ');
    return `Please enter a valid filename in the 'filename' query segment. Filenames are available : ${availableImageNames}.`;
  }
  if (!query.width && !query.height) {
    return null; // No size values
  }
  const img_width: number = parseInt(query.width || '');
  if (Number.isNaN(img_width) || img_width < 1) {
    return "Please enter a positive numerical value for the 'img_width' query segment.";
  }
  const img_height: number = parseInt(query.height || '');
  if (Number.isNaN(img_height) || img_height < 1) {
    return "Please enter a positive numerical value for the 'img_height' query segment.";
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
    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumb(request.query);
    }
    if (error) {
      response.send(error);
      return;
    }
    const path: null | string = await File.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened');
    }
  }
);
export default images_resize;
