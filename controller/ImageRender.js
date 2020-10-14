let fs = require('fs');
let Controller = require('./Controller.js');
module.exports = class ImageRender extends Controller {

    constructor(req, res, path) {
        super(req, res);
        this.path = path;
    }

    render() {
        let name = this.req.name ? 'me.jpg' : 'me.jpg';
        let file = this.path + name;
        if (fs.existsSync(file)) {

            fs.readFile(file, (err, data) => {
                this.res.send(data);
            });

        } else {
            console.log(`${file}`);
        }
    }

}