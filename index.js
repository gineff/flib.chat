const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get(/\.[a-z0-9]+/i, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", req.originalUrl));
});
app.use("/images", express.static(path.join(__dirname, "/dist/images")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.use(express.static("./dist"));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
