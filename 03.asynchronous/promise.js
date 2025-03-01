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
    .then(() => {
      return runDB(db, insertQuery, insertParam);
    })
    // 指摘8
    // アロー関数の中身が return しかないときは簡潔文体を使ってください。

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

function executeErrorDBOperation() {
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
      // 指摘9
      // this.lastID と出力されていますがそうではなさそうです。
    })
    .catch((error) => {
      console.error(error.message);
    })
    .then(() => {
      return getDB(db, errorSelectQuery);
    })
    .then((result) => {
      console.log(`${result.id}: ${result.title}`);
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
