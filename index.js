const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get(/login|register|profile|chat|400|500/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.use(express.static("./dist"));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
