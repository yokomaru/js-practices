import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
  {
    db.run(
      "INSERT INTO books (title) values ($1)",
      {
        $1: "Title1",
      },
      function () {
        console.log(`this.lastID: ${this.lastID}`);
        db.get("SELECT id, title FROM books", (error, row) => {
          console.log(row.id + ": " + row.title);
          db.run("DROP TABLE books");
        });
      },
    );
  }
});

await timers.setTimeout(100);

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
  {
    db.run("INSERT INTO books (id, title) VALUES ('1', 'Title1');", () => {
      db.run(
        "INSERT INTO books (id, title) VALUES ('1', 'Title2');",
        (error) => {
          console.error(error);
          db.each(
            "SELECT id, titl FROM books ",
            (error, row) => {
              console.log(row.id + ": " + row.title);
            },
            (error) => {
              console.error(error);
              db.run("DROP TABLE books", () => {
                db.close();
              });
            },
          );
        },
      );
    });
  }
});
