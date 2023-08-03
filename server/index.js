const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { config } = require("dotenv");
config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error Connecting To MongoDB", error));

// setup middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => res.send("API"));

app.use("/api/v1", require("./routes/task"));

app.listen(PORT, () => console.log(`listening at ${PORT}`));
