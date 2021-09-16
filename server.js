const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

// Serve files from dist directory
app.use(serveStatic(path.join(__dirname, "dist")));
// Set port config
const port = process.env.PORT || 8000;
app.listen(port);

console.log("Listening on port " + port);
