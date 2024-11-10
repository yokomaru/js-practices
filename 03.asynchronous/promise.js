//import timers from "timers/promises";
import sqlite3 from "sqlite3";

const create = "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)";
const insert = "INSERT INTO books (title) values ($1)";
const select = "SELECT id, title FROM books";
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
    const param = { $1: "Title1" };
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

dbOperation();
