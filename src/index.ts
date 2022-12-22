import express from 'express';
import routes from './routes/index';
import ImgFile from './file';

const img_app: express.Application = express();
const url_port: number = 8069;
img_app.use(routes);
img_app.listen(url_port, async (): Promise<void> => {
  await ImgFile.createThumbPath();
  const url: string = `\x1b[2mhttp://localhost:${url_port}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});
export default img_app;
