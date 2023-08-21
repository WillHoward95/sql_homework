const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const { getAllCars } = require("../mysql/queries");

router.get("/cars", async (req, res) => {
  const results = await asyncMySQL(getAllCars());

  res.send({ status: 1, results });
});

module.exports = router;
