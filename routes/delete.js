const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.delete("/car/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.send({ status: 0, error: "invalid ID" });
    return;
  }

  const toDelete = await asyncMySQL(`SELECT id, year, make, model, type
                                          FROM cars_table
                                            WHERE id LIKE ${id}`);

  await asyncMySQL(`DELETE FROM cars_table 
                        WHERE id LIKE ${id}`);

  res.send({ status: 1, deleted: toDelete });
  return;
});

module.exports = router;
