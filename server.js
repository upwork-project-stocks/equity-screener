const mongoose = require("mongoose");
const cron = require("node-cron");
const allStocks = require("./request");
const startSearch = require("./start");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection succesful");
  });

// allStocks.allStocks();

cron.schedule("* * 6 * * *", () => {
  // console.log("Starting cron");
  startSearch.startingPoint();

  console.log("Cron job ended");
});

const server = app.listen(10000, () => {
  console.log("Server Running");
});
