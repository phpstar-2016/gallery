let Controller = require('./Controller');
let User = require('../Model/User');

module.exports = class Register extends Controller {

    createUser() {
        this.expected = {
            username: {isAlphanumeric: true, maxLength: 10, minLength: 4},
            password: {isNoSpace: true, maxLength: 500, minLength: 6},
            email: {maxLength: 30}
        };
        this.required = ['username', 'password', 'email'];
        this.checkStrings(this.expected, this.required);
        if (Object.keys(this.errors).length > 0) {
            this.res.send(this.errors);
            this.res.end();
            return;
        }
        let user = new User;
        if (user.create(this.clean.username, this.clean.password, this.clean.email))
            this.res.send({action: true});
        this.res.end();

    }

}
