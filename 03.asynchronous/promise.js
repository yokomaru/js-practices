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

const executeSuccessDBOperation = () => {
  const db = new sqlite3.Database(":memory:");

  runQuery(db, createQuery)
    .then(() => runQuery(db, insertQuery, insertParam))
    .then((insertedResult) => {
      console.log(`lastID: ${insertedResult.lastID}`);
      return getFirstRow(db, selectQuery);
    })
    .then((row) => {
      console.log(`${row.id}: ${row.title}`);
      return runQuery(db, dropQuery);
    })
    .then(() => closeDB(db));
};

const executeErrorDBOperation = () => {
  const db = new sqlite3.Database(":memory:");

  runQuery(db, createQuery)
    .then(() => runQuery(db, insertQuery, insertParam))
    .then(() => runQuery(db, insertQuery, insertParam))
    .then((insertedResult) => console.log(`lastID: ${insertedResult.lastID}`))
    .catch((error) => console.error(error.message))
    .then(() => getFirstRow(db, errorSelectQuery))
    .then((row) => console.log(`${row.id}: ${row.title}`))
    .catch((error) => console.error(error.message))
    .then(() => runQuery(db, dropQuery))
    .then(() => closeDB(db));
};

console.log("Success");
executeSuccessDBOperation();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperation();
