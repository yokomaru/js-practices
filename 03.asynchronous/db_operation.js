export const runStatement = (db, query, param) => {
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

export const getFirstRow = (db, query) => {
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

export const closeDB = (db) => {
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