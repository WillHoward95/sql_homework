const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("new request");
  next();
});

app.use("/get", require("./routes/getAll"));
app.use("/car", require("./routes/car"));
app.use("/user", require("./routes/user"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
