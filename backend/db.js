const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://salaudeensalu:9535443020@cluster0.pgavc17.mongodb.net/ACIVITYTRACKER?retryWrites=true&w=majority&appName=Cluster0";
const mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoDb;
