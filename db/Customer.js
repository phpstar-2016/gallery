let BaseDB = require('./BaseDB');

module.exports = class Customer extends BaseDB {
    async create(username, pwd, email) {
        this.connection = await this.connector.getConnection();
        await this.connection.db('gallery').collection('users').insertOne({
            username: username,
            pwd: pwd,
            email: email
        }, (err) => {
            if (err)
                throw err;
        });
    }

    async getLoginInfo(username) {
        this.connection = await this.connector.getConnection();
        return await this.connection.db('gallery').collection('users').findOne({username: username}, {projection:{pwd:1, _id:0}});
    }
}