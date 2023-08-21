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

  const toUpdate = await asyncMySQL(`SELECT id, year, make, model, type
                                        FROM cars_table
                                            WHERE id LIKE ${id}`);

  const newData = {};

  try {
    if (year) {
      if (typeof year === "number") {
        await asyncMySQL(`UPDATE cars_table SET year = "${year}"
                            WHERE id LIKE "${id}";`);
        newData.year = year;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    if (make) {
      if (typeof make === "string") {
        await asyncMySQL(`UPDATE cars_table SET make = "${make}"
                              WHERE id LIKE "${id}";`);
        newData.make = make;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    if (model) {
      if (typeof model === "string") {
        await asyncMySQL(`UPDATE cars_table SET model = "${model}"
                            WHERE id LIKE "${id}";`);
        newData.model = model;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    if (type) {
      if (typeof type === "string") {
        await asyncMySQL(`UPDATE cars_table SET type = "${type}"
                            WHERE id LIKE "${id}";`);
        newData.type = type;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
  } catch (error) {
    res.send({ status: 0, error: error.sqlMessage });
    return;
  }
  res.send({ status: 1, oldData: toUpdate[0], newData: newData });
});

module.exports = router;
