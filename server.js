const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("new request");
  next();
});

app.use("/get", require("./routes/get"));
app.use("/delete", require("./routes/delete"));
app.use("/add", require("./routes/add"));
app.use("/update", require("./routes/update"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
