let settings = require('../config/config');

module.exports = class Session {

    constructor(session) {
        this.sess = session;
    }

    setAuthInfo(userId) {
        this.sess.userId = userId;
        this.sess.loginAt = new Date().getTime();
    }

    clearAuthInfo() {
        delete this.sess.userId;
        delete this.sess.loginAt;
    }

    checkTimeOut() {
        let time_to = this.sess.loginAt + settings.session.life_time;
        let now = new Date().getTime();
        if (time_to >= now) {
            this.sess.loginAt = now;
            return true;
        }

        this.clearAuthInfo();
        return false;
    }

    isAuthenticated() {
        return this.sess.loginAt != undefined;
    }
}