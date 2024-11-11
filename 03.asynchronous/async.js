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
  return new Promise((resolve) => {
    db.close();
    resolve("削除");
  });
}

async function dbOperation() {
  const db = new sqlite3.Database(":memory:");
  const param = { $2: "Title1" };

  await dbRun(db, create);
  const dbInsert = await dbRun(db, insert, param);
  console.log(`this.lastID: ${dbInsert.lastID}`);
  const dbSelect = await dbGet(db, select);
  console.log(dbSelect.id + ": " + dbSelect.title);
  await dbRun(db, drop);
  await dbClose(db);
}

async function dbErrorOperation() {
  const db = new sqlite3.Database(":memory:");
  const param1 = { $1: 1, $2: "Title1" };
  const param2 = { $1: 1, $2: "Title1" };

  await dbRun(db, create);
  await dbRun(db, insert, param1);
  try {
    await dbRun(db, insert, param2);
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT'){
      console.log(err);
    }
  }
  try {
    await dbGet(db, selectError);
  } catch (err) {
    if (err.code == 'SQLITE_ERROR'){
      console.log(err);
    }
  }
  await dbRun(db, drop);
  await dbClose(db);
}

console.log("No Error")
dbOperation();
await timers.setTimeout(100);
console.log("-------------------------------------")
console.log("Error")
dbErrorOperation();
