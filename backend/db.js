const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://salaudeensalu:9535443020@cluster0.pgavc17.mongodb.net/ACIVITYTRACKER?retryWrites=true&w=majority&appName=Cluster0";
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
