var express = require('express');
var router = express.Router();

// db
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {

  db = new sqlite3.Database('./sample.db');

  let sql = `SELECT * FROM user ORDER BY id`;

  db.all(sql, [], (err, rows) => {

    if (err) {
      throw err;
    }

    rows.forEach((row) => {
      console.log(row.id);
    });

    res.render('users', {users: rows});

    // close the database connection
    db.close();

  });

});

module.exports = router;
