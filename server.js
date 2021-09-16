const express = require("express");

const app = express();

// Serve files from dist directory
app.use(express.static(__dirname + "/dist/"));
// Fix for error in retrieving routes when running build files
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
// Set port config
const port = process.env.PORT || 8000;
app.listen(port);

console.log("Listening on port " + port);
