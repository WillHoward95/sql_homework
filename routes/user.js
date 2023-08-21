const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const { addUser, getCarByUser } = require("../mysql/queries");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await asyncMySQL(addUser(email, password));
    res.send({ status: 1, userId: result.insertId });
    return;
  } catch (e) {
    s;
    res.send({ status: 0, error: e.sqlMessage });
    return;
  }
});

module.exports = router;
