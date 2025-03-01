#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {createQuery, insertQuery, selectQuery, errorSelectQuery, dropQuery, insertParam} from  "./query.js";

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

// 指摘１
// 他のファイルと定義が重複しています。課題の注意点にもコピーしないように書かれていますよ。https://bootcamp.fjord.jp/pages/511#%E6%B3%A8%E6%84%8F%E7%82%B9-3
// また、runDB と getDB はアロー関数と変数宣言で定義されているのに、closeDB は function 文で定義されていて一貫性がないです。


const executeSuccessDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");

  await runDB(db, createQuery);
  const insertedRow = await runDB(db, insertQuery, insertParam);
  // 指摘2
  // Promise のプログラムと結果を受ける変数の名前が異なっています。
  // また、runDB の実行結果として受け取れるのは row ではないので名前も適当ではなさそうです。


  console.log(`this.lastID: ${insertedRow.lastID}`);

  const selectedRow = await getDB(db, selectQuery);
  console.log(`${selectedRow.id}: ${selectedRow.title}`);
  await runDB(db, dropQuery);
  await closeDB(db);
};


const executeErrorDBOperation = async () => {
  const db = new sqlite3.Database(":memory:");

  await runDB(db, createQuery);
  await runDB(db, insertQuery, insertParam);
  try {
    const insertedRow = await runDB(db, insertQuery, insertParam);
    console.log(`this.lastID: ${insertedRow.lastID}`);
  } catch (error) {
    // 指摘3
    // error にプロパティアクセスできないような値が格納されていると error.code の部分でエラーが起きてしまいます。
    if (error.code == "SQLITE_CONSTRAINT") {
      console.error(error.message);
    // 指摘4
    // 例外が握り潰されています。例外を握り潰してはいけません。例外処理を行っている意味がなくなってしまいます。捕捉したい例外のみを捕捉するようにしてください。
    }
  }
  try {
    const selectedRow = await getDB(db, errorSelectQuery);
    console.log(`${selectedRow.id}: ${selectedRow.title}`);
  } catch (error) {
    if (error.code == "SQLITE_ERROR") {
      console.error(error.message);
    }
  }
  await runDB(db, dropQuery);
  await closeDB(db);
};

console.log("Success");
executeSuccessDBOperation();
await timers.setTimeout(100);
// 指摘5
// async/await のプログラムでは setTimeout の呼び出しは必要ないはずです。なぜかを考えて理由をコメントしてください。
console.log("-------------------------------------");
console.log("Error");
executeErrorDBOperation();
