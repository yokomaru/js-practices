import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)",
  () => {
    {
      const stmt = db.prepare("INSERT INTO books (title) VALUES (?)", () => {
        for (let i = 1; i <= 10; i++) {
          stmt.run("Title " + i);
        }
        stmt.finalize(() => {
          db.each(
            "SELECT id, title FROM books",
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
  },
);
