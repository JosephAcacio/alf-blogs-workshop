// db here
const mongoose = require('mongoose');
const dataBaseUrl = process.env.DATABASE_URL

const connectDb = async() => {
    try {
        await mongoose.connect(dataBaseUrl);

        console.log("Connection of Database: Success");
    }catch (error){
        console.log(error);
    }
}

module.exports = connectDb;
