const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.post("/car", async (req, res) => {
  const { year, make, model, type } = req.body;

  if (
    !year ||
    !make ||
    !model ||
    !type ||
    typeof year !== "number" ||
    typeof make !== "string" ||
    typeof model !== "string" ||
    typeof type !== "string"
  ) {
    res.send({ status: 0, error: "incomplete info" });
  }

  try {
    await asyncMySQL(`INSERT INTO cars_table
                        (year, make, model, type)
                          VALUES
                            ("${year}", "${make}", "${model}", "${type}")`);
    res.send({ status: 1 });
  } catch (error) {
    res.send({ status: 0, error: "duplicate entry" });
  }
});

module.exports = router;
