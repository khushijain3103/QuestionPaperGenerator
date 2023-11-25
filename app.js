const express = require("express");
require("./src/db/");

const app = express();

app.use(express.json());

app.get("*", (req, res) => {
    res.status(404).send({ message: "Page not found" });
});

module.exports = app;