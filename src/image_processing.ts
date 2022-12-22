import sharp from 'sharp';

interface imgsharpResizeParams {
  imgsource: string;
  imgtarget: string;
  imgwidth: number;
  imgheight: number;
}
const processImage = async (
  params: imgsharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.imgsource)
      .resize(params.imgwidth, params.imgheight)
      .toFormat('jpeg')
      .toFile(params.imgtarget);
    return null;
  } catch {
    return 'Please check image type , this image could not be processed.';
  }
};
export default processImage;
