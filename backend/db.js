const mongoose = require("mongoose");

const mongoURI = process.env.MONGOCONNECTION;
const mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const WebCollection = mongoose.connection.db.collection("webcam");
    const fetchData = await WebCollection.find({}).toArray();
       
    if (fetchData === null) {
      console.log("Data is null");
    } else {
      global.WebCollection = fetchData;
     

    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoDb;
