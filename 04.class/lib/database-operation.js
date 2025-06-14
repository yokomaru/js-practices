class DatabaseOperation {
  #db;
  constructor(db) {
    this.#db = db;
  }

  close = () => {
    return new Promise((resolve, reject) => {
      this.#db.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  createTable = (query) => {
    return new Promise((resolve, reject) => {
      this.#db.run(query, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  };

  delete = (query, id) => {
    return new Promise((resolve, reject) => {
      this.#db.run(query, id, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  };

  insert = (query, param) => {
    return new Promise((resolve, reject) => {
      this.#db.run(query, param, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  };

  selectAll = (query) => {
    return new Promise((resolve, reject) => {
      this.#db.all(query, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  };
}

export { DatabaseOperation };
