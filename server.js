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
  console.log("Starting cron");
  startSearch.startingPointEquities();
});

const server = app.listen(3000, () => {
  console.log("Server Running");
  setTimeout(() => {
    // startSearch.sleep(1500);
    // startSearch.startingPointEquities();
    // startSearch.sleep(1500);
    // startSearch.startingPointCryptos();
    // startSearch.sleep(1500);
    //startSearch.failedSearchResults();
  }, 1000);
});
