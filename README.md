### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

## Usage
The server will listen on port 8069:

### Brief instructions
http://localhost:8069/

### Endpoint to resize images
http://localhost:8069/api/images

Expected query arguments are:
- _filename_: Filenames are available:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

### Example 1
http://localhost:8069/api/images
Will display a hint and list available image names

### Example 2
http://localhost:8069/api/images?imgfilename=encenadaport
Will display the original encenadaport image.

### Example 3
http://localhost:8069/api/images?imgfilename=encenadaport&imgwidth=200&imgheight=200
Will scale the encenadaport image to 200 by 200 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.

### Example 4
http://localhost:8069/api/images?imgfilename=encenadaport&imgwidth=-200&imgheight=200
Invalid width parameter that will be hinted to.

### Example 5
http://localhost:8069/api/images?imgfilename=encenadaport&imgwidth=200
Missing height parameter that will be hinted to.

### Notes
- Images are served from `assets/images/full`. Further images with the extension
  can be put into that directory, but the filetype is not checked.
- Image thumbs will be stored in `assets/images/thumb` and can be deleted from
  there to verify that in that case they will be re-created on subsequent calls
  to the same endpoint.
