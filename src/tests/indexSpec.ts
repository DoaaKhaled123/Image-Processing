import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import ImgFile from './../file';

const img_request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await img_request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?imgfilename=encenadaport (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await img_request.get(
        '/api/images?imgfilename=encenadaport'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?imgfilename=encenadaport&imgwidth=199&imgheight=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await img_request.get(
        '/api/images?imgfilename=encenadaport&imgwidth=199&imgheight=199'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?imgfilename=encenadaport&imgwidth=-200&imgheight=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await img_request.get(
        '/api/images?imgfilename=encenadaport&imgwidth=-200&imgheight=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await img_request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await img_request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});

afterAll(async (): Promise<void> => {
  const imgPathResized: string = path.resolve(
    ImgFile.imgThumbPath,
    'encenadaport-199x199.jpg'
  );

  try {
    await fs.access(imgPathResized);
    fs.unlink(imgPathResized);
  } catch {
  }
});
