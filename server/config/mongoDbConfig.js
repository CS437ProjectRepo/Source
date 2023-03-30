const mongoose = require('mongoose');
require('dotenv').config();

const MongoDBOptions = ()=> {
    const options = {};
    options.useNewUrlParser = true;
    options.useUnifiedTopology = true;
    return options;
}

const MongoDbSchemaOptions = () => {
    let options = {}
    options.strictQuery = false
    return options
}

const connectToDatabase = async (uri = process.env.MONGOURI) => {
    try {
        mongoose.set(MongoDbSchemaOptions());
        await mongoose.connect(uri, MongoDBOptions())
        console.log("connected to mongo");
    } catch (error) {
        console.log(error)
    }
}

const disconnectFromDatabase = async () => {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.log(error);
    }
  };

const dropTheDatabase = async () => {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    } catch (error) {
        console.log(error)
    }
}

const dropCollections = async () => {
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections) {
        await collection.drop();
    }
}

 module.exports = {
    connectToDatabase,
    dropCollections,
    dropTheDatabase,
    disconnectFromDatabase,
    MongoDBOptions,
    MongoDbSchemaOptions
};