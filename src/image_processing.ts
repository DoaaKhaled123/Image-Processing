import sharp from 'sharp';

interface imgsharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}
const processImage = async (
  params: imgsharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return 'Please check image type , this image could not be processed.';
  }
};
export default processImage;
