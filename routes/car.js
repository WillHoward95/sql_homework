const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const {
  getCar,
  addCar,
  selectToDelete,
  deleteCar,
  selectToUpdate,
  updateCar,
} = require("../mysql/queries");

router.post("/", async (req, res) => {
  const { year, make, model, type, userId } = req.body;

  if (
    !year ||
    !make ||
    !model ||
    !type ||
    !userId ||
    typeof year !== "number" ||
    typeof make !== "string" ||
    typeof model !== "string" ||
    typeof type !== "string" ||
    typeof userId !== "number"
  ) {
    res.send({ status: 0, error: "incomplete info" });
    return;
  }

  try {
    await asyncMySQL(addCar(year, make, model, type, userId));
    res.send({ status: 1 });
    return;
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error: "duplicate entry" });
    return;
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.send({ status: 0, error: "invalid ID" });
    return;
  }

  const toDelete = await asyncMySQL(selectToDelete(id));

  await asyncMySQL(deleteCar(id));

  res.send({ status: 1, deleted: toDelete });
  return;
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.send({ status: 0, error: "invalid ID" });
  }

  //ask sql for data
  const results = await asyncMySQL(getCar(id));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, error: "id not found" });
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { year, make, model, type } = req.body;

  if (isNaN(id)) {
    res.send({ status: 0, error: "invalid ID" });
    return;
  }

  const toUpdate = await asyncMySQL(selectToUpdate(id));

  if (!toUpdate[0]) {
    res.send({ status: 0, error: "could not find matching ID" });
    return;
  }

  const newData = {};

  try {
    if (year) {
      if (typeof year === "number") {
        await asyncMySQL(updateCar(id, "year", year));
        newData.year = year;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    if (make) {
      if (typeof make === "string") {
        await asyncMySQL(updateCar(id, "make", make));
        newData.make = make;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    if (model) {
      if (typeof model === "string") {
        await asyncMySQL(updateCar(id, "model", model));
        newData.model = model;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    if (type) {
      if (typeof type === "string") {
        console.log("test");
        await asyncMySQL(updateCar(id, "type", type));
        newData.type = type;
      } else {
        res.send({ status: 0, error: "bad data" });
        return;
      }
    }
    console.log(newData);
  } catch (error) {
    res.send({ status: 0, error: error.sqlMessage });
    return;
  }
  res.send({ status: 1, oldData: toUpdate[0], newData: newData });
});

module.exports = router;
