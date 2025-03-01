#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {createQuery, insertQuery, selectQuery, errorSelectQuery, dropQuery, insertParam} from  "./query.js";
import {runDB, getDB, closeDB} from  "./db_operation.js";

// 指摘7
// runDB という名前だと database を run するかのように見えてしまいます。closeDB はそれで意味的にあっていますが、runDB や getDB はあっていなさそうです。

function executeSuccessDBOperation() {
  const db = new sqlite3.Database(":memory:");

  runDB(db, createQuery)
    .then(() => {return runDB(db, insertQuery, insertParam);})
    .then((insertResult) => {
      console.log(`this.lastID: ${insertResult.lastID}`);
      return getDB(db, selectQuery);
    })
    .then((selectResult) => {
      console.log(`${selectResult.id}: ${selectResult.title}`);
      return runDB(db, dropQuery);
    })
    .then(() => {closeDB(db);});
}

function executeErrorDBOperation() {
  const db = new sqlite3.Database(":memory:");

  runDB(db, createQuery)
    .then(() => {
      return runDB(db, insertQuery, insertParam);
    })
    .then(() => {
      return runDB(db, insertQuery, insertParam);
    })
    .then((insertResult) => {
      console.log(`Statement.lastID: ${insertResult.lastID}`);
      // 指摘9
      // this.lastID と出力されていますがそうではなさそうです。
    })
    .catch((error) => {
      console.error(error.message);
    })
    .then(() => {
      return getDB(db, errorSelectQuery);
    })
    .then((selectResult) => {
      console.log(`${selectResult.id}: ${selectResult.title}`);
    })
    .catch((error) => {
      console.error(error.message);
    })
    .then(() => {
      return runDB(db, dropQuery);
    })
    .then(() => {
      return closeDB(db);
    });
}

console.log("Success");
executeSuccessDBOperation();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperation();
