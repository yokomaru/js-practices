import readline from "readline";
import { SelectPrompt } from "./select-prompt.js";
import { UserInputInterface } from "./user-input-interface.js";

class Command {
  #memoControl;
  constructor(memoControl) {
    this.#memoControl = memoControl;
  }

  createMemo = async () => {
    let lines = [];
    const inputLines = await new UserInputInterface(readline).run(lines);
    const memo = inputLines.join("\n");
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
      const answer = await new SelectPrompt(
        "Choose a memo you want to delete:",
      ).runQuestionForDelete(memos);
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
      const answer = await new SelectPrompt(
        "Choose a note you want to see:",
      ).runQuestionForRead(memos);
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
