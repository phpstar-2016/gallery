let bcrypt = require('bcrypt');
let customer_db = require('../DB/Customer');
let settings = require('../config/config');

module.exports = class User{

    create(username, password, email)
    {
        let pwd = this.getHashedPassword(password);
        let db = new customer_db;
        db.create(username, pwd, email);
        return true;
    }

    getHashedPassword(pwd){
        return bcrypt.hashSync(pwd, settings.password.cost);
    }

}