let MongoClient = require('mongodb').MongoClient;

module.exports = class MongoDBConnector {
    constructor() {
        this.client = null;
    }
    async getConnection(dbUrl = 'mongodb://localhost:27017/', options = {}){
        if(this.client)
            return this.client;
        this.client = new MongoClient(dbUrl, options);
        await this.client.connect();
        return this.client;
    }
}