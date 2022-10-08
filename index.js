const express = require("express");
const path = require("path");

const app = express();

app.use("/", express.static(path.join(__dirname, "/dist")));

/*
app.get(/\.[a-z0-9]+/i, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", req.originalUrl));
});

app.use("/images", express.static(path.join(__dirname, "/dist/images")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
*/
app.listen(3000, () => console.log("Server http://localhost:3000"));
