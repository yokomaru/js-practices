#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {
  createQuery,
  insertQuery,
  selectQuery,
  errorSelectQuery,
  dropQuery,
  insertParam,
} from "./query.js";
import { runQuery, getFirstRow, closeDB } from "./db_operation.js";

function executeSuccessDBOperation() {
  const db = new sqlite3.Database(":memory:");

  runQuery(db, createQuery)
    .then(() => runQuery(db, insertQuery, insertParam))
    .then((insertedResult) => {
      console.log(`this.lastID: ${insertedResult.lastID}`);
      return getFirstRow(db, selectQuery);
    })
    .then((selectResult) => {
      console.log(`${selectResult.id}: ${selectResult.title}`);
      return runQuery(db, dropQuery);
    })
    .then(() => closeDB(db));
}

function executeErrorDBOperation() {
  const db = new sqlite3.Database(":memory:");

  runQuery(db, createQuery)
    .then(() => runQuery(db, insertQuery, insertParam))
    .then(() => runQuery(db, insertQuery, insertParam))
    .then((insertedResult) => console.log(`lastID: ${insertedResult.lastID}`))
    .catch((error) => console.error(error.message))
    .then(() => getFirstRow(db, errorSelectQuery))
    .then((selectResult) =>
      console.log(`${selectResult.id}: ${selectResult.title}`),
    )
    .catch((error) => console.error(error.message))
    .then(() => runQuery(db, dropQuery))
    .then(() => closeDB(db));
}

console.log("Success");
executeSuccessDBOperation();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperation();
