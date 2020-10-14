let MongoDBConnector = require('../app/mongoConnector');

module.exports = class BaseDB{
    constructor() {
        this.connector = new MongoDBConnector();
    }
}