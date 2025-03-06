export const runQuery = (db, query, param) => {
  return new Promise((resolve, reject) => {
    db.run(query, param, function (error) {
      error ? reject(error) : resolve(this);
    });
  });
};

export const getFirstRow = (db, query) => {
  return new Promise((resolve, reject) => {
    db.get(query, (error, row) => (error ? reject(error) : resolve(row)));
  });
};

export const closeDB = (db) => {
  return new Promise((resolve, reject) => {
    db.close((error) => (error ? reject(error) : resolve()));
  });
};
