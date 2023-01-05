const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const axios = require("axios");

const port = process.env.PORT || 3000;
server.setTimeout(500000);

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.get("/", async (req, res) => {
  res.send("ok");
});

app.post("/download", async (req, res) => {
  try {
    if (
      req.headers.referer !== "https://twitterdownload.f5game.co.kr/" &&
      req.headers.referer !== "http://127.0.0.1:5173/"
    ) {
      return res.status(200).send({ message: "no hack" });
    }

    const { url } = req.body;
    const { data } = await axios.post("http://115.85.182.17/videos", {
      url,
    });
    return res.status(200).send(data);
  } catch (e) {
    return res.status(200).send("no data");
  }
});

server.listen(port, () => {
  console.log(`twitter-downloader Server Open Port: ${port}`);
});
