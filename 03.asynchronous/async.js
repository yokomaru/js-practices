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
import { runStatement, getFirstRow, closeDB } from "./db_operation.js";

const executeSuccessDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");
  await runStatement(db, createQuery);
  const insertResult = await runStatement(db, insertQuery, insertParam);
  console.log(`this.lastID: ${insertResult.lastID}`);
  const selectResult = await getFirstRow(db, selectQuery);
  console.log(`${selectResult.id}: ${selectResult.title}`);
  await runStatement(db, dropQuery);
  await closeDB(db);
};

const executeErrorDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");
  await runStatement(db, createQuery);
  await runStatement(db, insertQuery, insertParam);
  try {
    const insertResult = await runStatement(db, insertQuery, insertParam);
    console.log(`this.lastID: ${insertResult.lastID}`);
  } catch (error) {
    if (error instanceof Error && error?.code == "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  try {
    const selectResult = await getFirstRow(db, errorSelectQuery);
    console.log(`${selectResult.id}: ${selectResult.title}`);
  } catch (error) {
    if (error instanceof Error && error?.code == "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  await runStatement(db, dropQuery);
  await closeDB(db);
};

console.log("Success");
await executeSuccessDBOperation();
console.log("-------------------------------------");
console.log("Error");
await executeErrorDBOperation();
