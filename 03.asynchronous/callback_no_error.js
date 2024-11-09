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
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      },
    );
  }
});
