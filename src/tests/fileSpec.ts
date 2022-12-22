import { promises as fs } from 'fs';
import path from 'path';
import ImgFile from './../file';

describe('Sharp Image Processing', (): void => {
  it('raises an error (Value of width invalid)', async (): Promise<void> => {
    const img_error: null | string = await ImgFile.createThumb({
      imgfilename: 'foo',
      imgwidth: '-100',
      imgheight: '500'
    });
    expect(img_error).not.toBeNull();
  });

  it('raises an error (filename does not exist)', async (): Promise<void> => {
    const img_error: null | string = await ImgFile.createThumb({
      imgfilename: 'foo',
      imgwidth: '100',
      imgheight: '500'
    });
    expect(img_error).not.toBeNull();
  });
  it('succeeds to write resized thumb file (existing file, size values valid )', async (): Promise<void> => {
    await ImgFile.createThumb({ imgfilename: 'encenadaport', imgwidth: '99', imgheight: '99' });

    const imgPathResized: string = path.resolve(
      ImgFile.imgThumbPath,
      `encenadaport-99x99.jpg`
    );
    let imgErrorFile: null | string = '';

    try {
      await fs.access(imgPathResized);
      imgErrorFile = null;
    } catch {
      imgErrorFile = 'File not created';
    }

    expect(imgErrorFile).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const imgPathResized: string = path.resolve(
    ImgFile.imgThumbPath,
    'encenadaport-100x100.jpg'
  );
  try {
    await fs.access(imgPathResized);
    fs.unlink(imgPathResized);
  } catch {
  }
});
