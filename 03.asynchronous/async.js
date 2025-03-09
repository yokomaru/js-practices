#!/usr/bin/env node

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

const executeSuccessDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");
  await runQuery(db, createQuery);
  const insertedResult = await runQuery(db, insertQuery, insertParam);
  console.log(`lastID: ${insertedResult.lastID}`);
  const row = await getFirstRow(db, selectQuery);
  console.log(`${row.id}: ${row.title}`);
  await runQuery(db, dropQuery);
  await closeDB(db);
};

const executeErrorDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");
  await runQuery(db, createQuery);
  await runQuery(db, insertQuery, insertParam);
  try {
    const insertedResult = await runQuery(db, insertQuery, insertParam);
    console.log(`lastID: ${insertedResult.lastID}`);
  } catch (error) {
    if (error instanceof Error && error?.code == "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  try {
    const row = await getFirstRow(db, errorSelectQuery);
    console.log(`${row.id}: ${row.title}`);
  } catch (error) {
    if (error instanceof Error && error?.code == "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  await runQuery(db, dropQuery);
  await closeDB(db);
};

console.log("Success");
await executeSuccessDBOperation();
console.log("-------------------------------------");
console.log("Error");
await executeErrorDBOperation();
