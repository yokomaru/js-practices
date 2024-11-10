//import timers from "timers/promises";
import sqlite3 from "sqlite3";

const create = "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)";
const insert = "INSERT INTO books (title) values ($1)";
const select = "SELECT id, title FROM books";
const drop = "DROP TABLE books";

function dbRun(sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (err) {
        console.log("callback has error ...");
        reject(err);
      } else {
        //console.log(`this.lastID: ${this.lastID}`);
        resolve(this);
      }
    });
  });
}

function dbGet(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (error, row) => {
      if (error) {
        console.log("callback has error ...");
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function dbClose() {
  return new Promise(() => {
    db.close();;
  });
}

const db = new sqlite3.Database(":memory:");

dbRun(create)
  .then(() => {
    const param = { $1: "Title1" };
    dbRun(insert, param).then((result) => {
      console.log(`this.lastID: ${result.lastID}`);
    });
  })
  .then(() => {
    dbGet(select)
      .then((db) => {
        console.log(db);
      })
      .then(() => {
        dbRun(drop).then(() => {
          dbClose();
        });
      });
  });
