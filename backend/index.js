const express = require("express");
const app = express();
const mongoDb = require("./db");
mongoDb();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use((req, res, next) => {
    const allowedOrigin = req.headers.origin || '*';
    
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


  app.use(express.json());
  app.use("/api", require("./routes/CreateUser"));
  app.use("/api",require("./routes/Extension"))
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
