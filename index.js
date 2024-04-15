const express = require("express");
const sql = require("mysql");

const app = express();
const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "api",
});
con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

app.get("/data", (req, res) => {
  con.query("select*from sample", (err, rows) => {
    if (err) {
      console.log("data not found");
    } else {
      res.json(rows);
    }
  });
});
app.post("/insert", (req, res) => {
  const { id, name, ph } = req.body;
  con.query("insert into sample values(?,?,?)", [id, name, ph], (err, data) => {
    if (err) {
      res.json({
        error: err,
      });
      return;
    }
    res.json({
      insert: true,
      res: data,
    });
  });
});
const port = 3000;
app.listen(port, () => {
  console.log("Runnning on port:${port}");
});
