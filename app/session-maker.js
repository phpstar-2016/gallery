let settings = require('../config/config');
let express_session = require('express-session');
let mongoStore = require('connect-mongo')(express_session);

module.exports = class SessionMaker {
    constructor() {
        this.options = {
            secret: ['first'],
            maxAge: settings.session.life_time,
            saveUninitialized: true,
            store: new mongoStore({
                url: this.getDbUri(),
                dbName: settings.db.name
            })
        }
    }

    getSession() {
        return express_session(this.options);
    }

    getDbUri() {
        return  settings.db.scheme + '://' + settings.db.host + '/' + settings.db.port;
    }
}