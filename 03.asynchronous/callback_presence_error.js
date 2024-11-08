import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (title TEXT)", () => {
  {
    const stmt = db.prepare("INSERT INTO books VALUES (?)", () => {
      for (let i = 1; i <= 10; i++) {
        stmt.run("Title " + i);
      }
      stmt.finalize(() => {
        // try {
        //   throw new Error("oops"); // 例外を生成
        // } catch (ex) {
        //   // 任意の例外を操作するための文
        //   console.error("inner", ex.message); // エラーハンドラーに例外オブジェクトを渡します
        //   return
        // }
        db.each(
          "SELECT rowid AS id, title FROM books",
          (error, row) => {
            console.log(row.id + ": " + row.title);
          },
          () => {
            db.run("DROP TABLE books", () => {
              console.log("削除");
              db.close();
            });
          },
        );
      });
    });
  }
});
