const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.get("/cars", async (req, res) => {
  const results = await asyncMySQL(`SELECT id, year, make, model, type
                                            FROM cars_table`);

  res.send({ status: 1, results });
});

router.get("/car/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.send({ status: 0, error: "invalid ID" });
  }

  //ask sql for data
  const results = await asyncMySQL(`SELECT id, year, make, model, type
                                    FROM cars_table
                                      WHERE id LIKE ${id}`);

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, error: "id not found" });
});

module.exports = router;
