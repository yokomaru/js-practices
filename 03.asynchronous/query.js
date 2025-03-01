export const createQuery = "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)";
export const insertQuery = "INSERT INTO books (title) values ($1)";
export const selectQuery = "SELECT id, title FROM books";
export const errorSelectQuery = "SELECT id, titl FROM books";
export const dropQuery = "DROP TABLE books";
export const insertParam = { $1: "Title1" };
