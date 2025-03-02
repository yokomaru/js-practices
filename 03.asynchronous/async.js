#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {createQuery, insertQuery, selectQuery, errorSelectQuery, dropQuery, insertParam} from  "./query.js";
import {runStatement, getFirstRow, closeDB} from  "./db_operation.js";

// 指摘１
// 他のファイルと定義が重複しています。課題の注意点にもコピーしないように書かれていますよ。https://bootcamp.fjord.jp/pages/511#%E6%B3%A8%E6%84%8F%E7%82%B9-3
// また、runDB と getDB はアロー関数と変数宣言で定義されているのに、closeDB は function 文で定義されていて一貫性がないです。


const executeSuccessDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");

  await runStatement(db, createQuery);
  const insertResult = await runStatement(db, insertQuery, insertParam);
  // 指摘2
  // Promise のプログラムと結果を受ける変数の名前が異なっています。
  // また、runDB の実行結果として受け取れるのは row ではないので名前も適当ではなさそうです。
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
// 指摘5
// async/await のプログラムでは setTimeout の呼び出しは必要ないはずです。なぜかを考えて理由をコメントしてください。
console.log("-------------------------------------");
console.log("Error");
await executeErrorDBOperation();
