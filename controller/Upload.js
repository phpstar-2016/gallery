let Controller = require('./Controller');
let formidable = require('formidable');
let fs = require('fs');
let sharp = require('sharp');
let settings = require('../config/config');
let imageSize = require('image-size');

module.exports = class Upload extends Controller {

    moveFile() {

        let dest_path = settings.upload.storage_dir;
        let f = new formidable.IncomingForm();
        f.parse(this.req, async (err, fields, files) => {
            if (!this.checkSize(files.image.size)) {
                this.setError('image', 'maxSize', this.getMaxSize());
                this.res.send({error: this.errors});
                return;
            }
            await fs.rename(files.image.path, dest_path + files.image.name, (err) => {
            });
            await this.calculateDimensions(files.image.path);
            await sharp(dest_path + files.image.name).resize(this.newWidth, this.newHeight).toFile(dest_path + 'xxx.jpg', (err) => {
                console.log(dest_path + files.image.name);
                if (err)
                    throw err;
                this.res.send('File uploaded');
            });

        });

    }

    checkSize(size) {
        return size <= settings.upload.max_size;
    }

    getMaxSize() {
        let size = settings.upload.max_size / (1024 * 1024);
        return size + ' Mb';
    }

    async calculateDimensions(filename) {
        let ratio = 1;
        let info = await imageSize(filename);
        let width = info.width;
        let height = info.height;
        let type = info.type;
        if (width) {
            let max = settings.upload.max_dimension;
            if (width >= height && width >= max) {
                ratio = max / width;
            } else if (height > width && height >= max) {
                ratio = max / height;
            }
            this.newWidth = Math.round(width * ratio);
            this.newHeight = Math.round(height * ratio);
            this.extension = type;
        } else {
            throw 'Could not determine dimensions of image';
        }
    }
}