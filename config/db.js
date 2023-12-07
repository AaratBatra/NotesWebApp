const mongoose = require("mongoose");
const mongo_uri = process.env.mongo_uri;

const connectDB = async() => {
    try {
        await mongoose.connect(mongo_uri, {
            dbName: 'notesapp',
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error in connecting to DB: "+ error);
    }
}

module.exports = connectDB;