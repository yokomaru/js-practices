import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE lorem (info TEXT)", (error) => {
  if (error) {
    console.log(error);
  } else {
    const stmt = db.prepare("INSERT INTO lorem VALUES (?)", (error) => {
      if (error) {
        console.log(error);
      } else {
        for (let i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
        }
        stmt.finalize((error) => {
          if (error) {
            console.log(error);
          } else {
            db.each(
              "SELECT rowid AS id, info FROM lorem",
              (err, row) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(row.id + ": " + row.info);
                }
              },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  db.run("DROP TABLE lorem", (error) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("DB削除");
                      db.close();
                    }
                  });
                }
              },
            );
          }
        });
      }
    });
  }
});
