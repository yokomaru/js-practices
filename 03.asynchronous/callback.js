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

const executeSuccessDBOperation = () => {
  const db = new sqlite3.Database(":memory:");
  db.run(createQuery, () => {
    {
      db.run(insertQuery, insertParam, function () {
        console.log(`lastID: ${this.lastID}`);
        db.get(selectQuery, (_, row) => {
          console.log(`${row.id}: ${row.title}`);
          db.run(dropQuery, () => db.close());
        });
      });
    }
  });
};

const executeErrorDBOperation = () => {
  const db = new sqlite3.Database(":memory:");
  db.run(createQuery, () => {
    {
      db.run(insertQuery, insertParam, () => {
        db.run(insertQuery, insertParam, (error, result) => {
          error
            ? console.error(error.message)
            : console.log(`lastID: ${result.lastID}`);
          db.get(errorSelectQuery, (error, row) => {
            error
              ? console.error(error.message)
              : console.log(`${row.id}: ${row.title}`);
            db.run(dropQuery, () => db.close());
          });
        });
      });
    }
  });
};

console.log("Success");
executeSuccessDBOperation();
await timers.setTimeout(100);
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperation();
