const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.patch("/car/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { year, make, model, type } = req.body;

  if (isNaN(id)) {
    res.send({ status: 0, error: "invalid ID" });
    return;
  }

  try {
    if (year && typeof year === "number") {
      await asyncMySQL(`UPDATE cars_table SET year = "${year}"
                              WHERE id LIKE "${id}";`);
    }
    if (make && typeof make === "string") {
      await asyncMySQL(`UPDATE cars_table SET make = "${make}"
                              WHERE id LIKE "${id}";`);
    }
    if (model && typeof model === "string") {
      await asyncMySQL(`UPDATE cars_table SET model = "${model}"
                              WHERE id LIKE "${id}";`);
    }
    if (type && typeof type === "string") {
      await asyncMySQL(`UPDATE cars_table SET type = "${type}"
                              WHERE id LIKE "${id}";`);
    }
  } catch (error) {
    res.send({ status: 0, error: error.sqlMessage });
  }
  res.send({ status: 1 });
});

module.exports = router;
