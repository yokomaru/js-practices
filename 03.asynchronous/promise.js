import timers from "timers/promises";
import sqlite3 from "sqlite3";

const createQuery =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)";
const insertQuery = "INSERT INTO books (title) values ($1)";
const selectQuery = "SELECT id, title FROM books";
const errorSelectQuery = "SELECT id, titl FROM books";
const dropQuery = "DROP TABLE books";
const insertParam = { $1: "Title1" };

function runDB(db, query, param) {
  return new Promise((resolve, reject) => {
    db.run(query, param, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

function getDB(db, query) {
  return new Promise((resolve, reject) => {
    db.get(query, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function closeDB(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function executeSuccessDBOperations() {
  const db = new sqlite3.Database(":memory:");

  runDB(db, createQuery)
    .then(() => {
      return runDB(db, insertQuery, insertParam);
    })
    .then((result) => {
      console.log(`this.lastID: ${result.lastID}`);
      return getDB(db, selectQuery);
    })
    .then((result) => {
      console.log(`${result.id}: ${result.title}`);
      return runDB(db, dropQuery);
    })
    .then(() => {
      return closeDB(db);
    });
}

function executeErrorDBOperations() {
  const db = new sqlite3.Database(":memory:");

  runDB(db, createQuery)
    .then(() => {
      return runDB(db, insertQuery, insertParam);
    })
    .then(() => {
      return runDB(db, insertQuery, insertParam);
    })
    .then((result) => {
      console.log(`this.lastID: ${result.lastID}`);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      return getDB(db, errorSelectQuery);
    })
    .then((result) => {
      console.log(`${result.id}: ${result.title}`);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      return runDB(db, dropQuery);
    })
    .then(() => {
      return closeDB(db);
    });
}

console.log("Success");
executeSuccessDBOperations();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperations();
