const express = require("express");
const app = express();
const port = 3001;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234qwer",
  database: "CRUDDataBase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//post요청
app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const sqlInsert =
    "INSERT INTO Board (title, contents, date) VALUES (?,?,SYSDATE ())";
  db.query(sqlInsert, [title, contents], (err, result) => {
    res.send(result);
  });
});

//db불러오기
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Board";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//서버포트연결~
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
