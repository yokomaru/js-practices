#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const createQuery =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)";
const insertQuery = "INSERT INTO books (title) values ($1)";
const selectQuery = "SELECT id, title FROM books";
const errorSelectQuery = "SELECT id, titl FROM books";
const dropQuery = "DROP TABLE books";
const insertParam = { $1: "Title1" };

const runDB = (db, query, param) => {
  return new Promise((resolve, reject) => {
    db.run(query, param, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
};

const getDB = (db, query) => {
  return new Promise((resolve, reject) => {
    db.get(query, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
};

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

const executeDBOperationWithSuccess = async () => {
  const db = new sqlite3.Database(":memory:");

  await runDB(db, createQuery);
  const insertedStatement = await runDB(db, insertQuery, insertParam);
  console.log(`this.lastID: ${insertedStatement.lastID}`);
  const selectedStatement = await getDB(db, selectQuery);
  console.log(`${selectedStatement.id}: ${selectedStatement.title}`);
  await runDB(db, dropQuery);
  await closeDB(db);
};

const executeDBOperationWithError = async () => {
  const db = new sqlite3.Database(":memory:");

  await runDB(db, createQuery);
  await runDB(db, insertQuery, insertParam);
  try {
    await runDB(db, insertQuery, insertParam);
  } catch (error) {
    if (error.code == "SQLITE_CONSTRAINT") {
      console.log(error);
    }
  }
  try {
    await getDB(db, errorSelectQuery);
  } catch (error) {
    if (error.code == "SQLITE_ERROR") {
      console.log(error);
    }
  }
  await runDB(db, dropQuery);
  await closeDB(db);
};

console.log("Success");
executeDBOperationWithSuccess();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeDBOperationWithError();
