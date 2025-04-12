#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { DatabaseOperation } from "./lib/database-operation.js";
const db = new sqlite3.Database("./test.db");
const databaseOperation = new DatabaseOperation(db);

const setup = async () => {
  try {
    await databaseOperation.createTable(
      "CREATE TABLE memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)",
    );
    console.log("Success create memos table");
  } catch (error) {
    if (error instanceof Error && error.code == "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  try {
    await databaseOperation.close();
  } catch (error) {
    if (error instanceof Error && error.code === "SQLITE_MISUSE") {
      console.log(error.message);
      process.exit(1);
    } else {
      throw error;
    }
  }
};

setup();
