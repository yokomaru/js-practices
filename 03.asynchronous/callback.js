import timers from "timers/promises";
import sqlite3 from "sqlite3";

const createQuery =
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT UNIQUE)";
const insertQuery = "INSERT INTO books (title) values ($1)";
const selectQuery = "SELECT id, title FROM books";
const errorSelectQuery = "SELECT id, titl FROM books";
const dropQuery = "DROP TABLE books";
const insertParam = { $1: "Title1" };

const executeSuccessDBOperations = () => {
  const db = new sqlite3.Database(":memory:");
  db.run(createQuery, () => {
    {
      db.run(insertQuery, insertParam, function () {
        console.log(`this.lastID: ${this.lastID}`);
        db.get(selectQuery, (error, result) => {
          console.log(`${result.id}: ${result.title}`);
          db.run(dropQuery, () => {
            db.close();
          });
        });
      });
    }
  });
};

const executeErrorDBOperations = () => {
  const db = new sqlite3.Database(":memory:");
  db.run(createQuery, () => {
    {
      db.run(insertQuery, insertParam, () => {
        db.run(insertQuery, insertParam, (error) => {
          console.error(error);
          db.all(
            errorSelectQuery,
            (result) => {
              console.log(`${result.id}: ${result.title}`);
            },
            (error) => {
              console.error(error);
              db.run(dropQuery, () => {
                db.close();
              });
            },
          );
        });
      });
    }
  });
};

console.log("Success");
executeSuccessDBOperations();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperations();
