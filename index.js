const express = require("express");
const app = express();
let bodyParser = require("body-parser");
let moment = require("moment-timezone");
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded());

const discordEpoch = 1420070400000;

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  let snowflake = req.body.snowflake;
  if (!snowflake) return;

  try {
    const id = BigInt.asUintN(64, snowflake);
    const dateBits = Number(id >> 22n);

    const date = new Date(dateBits + discordEpoch);
    const unix = dateBits + discordEpoch;
    const iso = new Date(unix).toISOString();
    const time = moment.utc(date).format("MMMM Do YYYY, h:mm:ss a");
    const timeFormatedUTC = `${time} UTC`;

    return res.render("timestamp", {
      unix: unix,
      utc: timeFormatedUTC,
    });
  } catch (e) {
    return;
  }
});

app.listen(3000, () => {
  console.log("server started");
});
