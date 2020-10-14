let controller = require('./Controller');
let mongo_connector = require('../app/mongoConnector');
let settings = require('../config/config');
let bcrypt = require('bcrypt');
let session = require('../app/session');

module.exports = class Login extends controller {
    async auth() {
        let input = this.req.body;
        if (!this.isString(input.username))
            if (!input.username || !input.password || !this.isString(input.username) || !this.isString(input.password)) {
                this.res.send({action: false});
                return;
            }
        let action = false;
        let username = input.username.substr(0, 20).trim();
        let password = input.password.trim();

        let connector = new mongo_connector();
        let client = await connector.getConnection();
        let info = await client.db(settings.db.name).collection('users').findOne({username: username}, {
            projection: {
                _id: 0,
                pwd: 1
            }
        });
        if (info.pwd) {
            let result = await bcrypt.compare(password, info.pwd);
            if (result) {
                // set session info
                let sess = new session(this.req.session);
                sess.setAuthInfo(username);
                action = true;
            } else {
                action = false;
            }
        }
        this.res.send({action: action});
    }
}