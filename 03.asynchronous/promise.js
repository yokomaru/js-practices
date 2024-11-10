import timers from "timers/promises";
import sqlite3 from "sqlite3";

const create = "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)";
const insert = "INSERT INTO books (id, title) values ($1, $2)";
const select = "SELECT id, title FROM books";
const selectError = "SELECT id, titl FROM books";
const drop = "DROP TABLE books";

function dbRun(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function dbGet(db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function dbClose(db) {
  return new Promise(() => {
    db.close();
  });
}

function dbOperation() {
  const db = new sqlite3.Database(":memory:");

  dbRun(db, create).then(() => {
    const param = { $2: "Title1" };
    dbRun(db, insert, param)
      .then((result) => {
        console.log(`this.lastID: ${result.lastID}`);
      })
      .then(() => {
        dbGet(db, select)
          .then((row) => {
            console.log(row.id + ": " + row.title);
          })
          .then(() => {
            dbRun(db, drop).then(() => {
              dbClose(db);
            });
          });
      });
  });
}

function dbErrorOperation() {
  const db = new sqlite3.Database(":memory:");

  dbRun(db, create).then(() => {
    const param1 = { $1: 1, $2: "Title1" };
    const param2 = { $1: 1, $2: "Title1" };
    dbRun(db, insert, param1)
      .then(
        dbRun(db, insert, param2)
          .then((result) => {
            console.log(`this.lastID: ${result.lastID}`);
          })
          .catch((result) => {
            // rejectの結果が引数に入る
            console.log(result);
          }),
      )
      .then(() => {
        dbGet(db, selectError)
          .then((row) => {
            console.log(row.id + ": " + row.title);
          })
          .catch((result) => {
            // rejectの結果が引数に入る
            console.log(result);
          })
          .then(() => {
            dbRun(db, drop).then(() => {
              dbClose(db);
            });
          });
      });
  });
}

dbOperation();
await timers.setTimeout(100);
dbErrorOperation();
