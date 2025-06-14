class Command {
  userInput;
  #memoControl;
  constructor(memoControl, userInput) {
    this.#memoControl = memoControl;
    this.userInput = userInput;
  }

  createMemo = async () => {
    let memo;
    try {
      const inputLines = await this.userInput.runMemoInput();
      memo = inputLines.join("\n");
    } catch (error) {
      if (error instanceof Error && error.message === "Unable to create memo") {
        console.log(error.message);
        return;
      } else {
        throw error;
      }
    }

    try {
      await this.#memoControl.create(memo);
      console.log("A memo has been created.");
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
    try {
      await this.#memoControl.databaseOperation.close();
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_MISUSE") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
  };

  deleteMemo = async () => {
    let memos;
    try {
      memos = await this.#memoControl.index();
      const answer = await this.userInput.runQuestionForDelete(
        memos,
        "Choose a memo you want to delete:",
      );
      await this.#memoControl.delete(answer.favorite.id);
      console.log("Memo successfully deleted.");
    } catch (error) {
      if (error instanceof Error && error.message === "No Data") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
    try {
      await this.#memoControl.databaseOperation.close();
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_MISUSE") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
  };

  displayMemoList = async () => {
    let memos;
    try {
      memos = await this.#memoControl.index();
      memos.map((obj) => console.log(obj.name));
    } catch (error) {
      if (error instanceof Error && error.message === "No Data") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
    try {
      await this.#memoControl.databaseOperation.close();
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_MISUSE") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
  };

  readMemo = async () => {
    let memos;
    try {
      memos = await this.#memoControl.index();
      const answer = await this.userInput.runQuestionForRead(
        memos,
        "Choose a note you want to see:",
      );
      console.log(answer.favorite.content);
    } catch (error) {
      if (error instanceof Error && error.message === "No Data") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
    try {
      await this.#memoControl.databaseOperation.close();
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_MISUSE") {
        console.log(error.message);
      } else {
        throw error;
      }
    }
  };
}

export { Command };
