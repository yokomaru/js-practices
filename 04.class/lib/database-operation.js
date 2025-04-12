class DatabaseOperation {
  constructor(db) {
    this.db = db;
  }

  selectAll = (query) => {
    return new Promise((resolve, reject) => {
      this.db.all(query, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  };

  close = () => {
    return new Promise((resolve, reject) => {
      this.db.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  delete = (query, id) => {
    return new Promise((resolve, reject) => {
      this.db.run(query, id, function (error) {
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
      this.db.run(query, param, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  };

  createTable = (query) => {
    return new Promise((resolve, reject) => {
      this.db.run(query, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  };
}

export { DatabaseOperation };
