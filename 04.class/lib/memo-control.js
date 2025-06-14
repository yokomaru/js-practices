import { Memo } from "./memo.js";

class MemoControl {
  constructor(databaseOperation) {
    this.databaseOperation = databaseOperation;
  }

  create = async (value) => {
    const query = "insert into memos(content) values(?)";
    return await this.databaseOperation.insert(query, value);
  };

  delete = async (id) => {
    const query = "DELETE FROM memos WHERE id = ?";
    return await this.databaseOperation.delete(query, id);
  };

  index = async () => {
    const query = "select id, content from memos";
    const rows = await this.databaseOperation.selectAll(query);
    if (rows.length === 0) {
      throw new Error("No Data");
    }
    const memos = rows.map((value) => {
      return new Memo(value.id, value.content);
    });
    return memos;
  };
}

export { MemoControl };
