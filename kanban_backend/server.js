const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require('cors');

const app = express();

const taskRoute = require("./routes/task.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); //acce lel navig

app.get("/", (req, res) => {
  res.status(200).json({ message: "Here We go" });
});

app.use("/task", taskRoute);

mongoose
  .set({ strictQuery: false })
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connect to DB & Server is running on port ${process.env.PORT}`);
    });
  });
