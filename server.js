const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tusql@27",
    database: "mydatabase"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

app.post("/save", (req, res) => {

    const { srno, collegeCode, collegeName, status } = req.body;

    db.query(
        "INSERT INTO users(srno, collegeCode, collegeName, status) VALUES (?, ?, ?, ?)",
        [srno, collegeCode, collegeName, status],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error");
            } else {
                res.send("Saved Successfully");
            }
        }
    );

});
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.json(result);
        }
    });
});

app.post("/saveDetails", (req, res) => {

    const { collegeCode, city, autonomy, fees, placement } = req.body;
    console.log(req.body);

    db.query(
        "INSERT INTO college_details (collegeCode, city, autonomy, fees, placement) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE city=?, autonomy=?, fees=?, placement=?",
        [
            collegeCode,
            city,
            autonomy,
            fees,
            placement,
            city,
            autonomy,
            fees,
            placement
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error");
            } else {
                res.send("Details Saved");
            }
        }
    );

});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});