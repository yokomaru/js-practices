import Enquirer from "enquirer";

class SelectPrompt {
  constructor(message) {
    this.message = message;
  }

  #generateQuestion = (memos) => {
    return {
      type: "select",
      name: "favorite",
      message: this.message,
      choices: memos,
      result() {
        return this.focused;
      },
    };
  };

  runQuestionForDelete = async (memos) => {
    const question = this.#generateQuestion(memos);
    const answer = Enquirer.prompt(question);
    return answer;
  };

  runQuestionForRead = async (memos) => {
    const question = this.#generateQuestion(memos);
    const answer = Enquirer.prompt(question);
    return answer;
  };
}

export { SelectPrompt };
