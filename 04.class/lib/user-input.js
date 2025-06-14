class UserInput {
  #readlineInterface;
  #enquirer;
  constructor(argv, isTTY, readline, Enquirer) {
    this.isDeleteOption = !!argv.d;
    this.isListOption = !!argv.l;
    this.isReadOption = !!argv.r;
    this.isTTY = !!isTTY;
    this.#readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.#enquirer = Enquirer;
  }

  runMemoInput = () => {
    const lines = [];
    return new Promise((resolve, reject) => {
      this.#readlineInterface
        .on("line", (line) => {
          if ((lines.length != 0 && !line) || line) {
            //linesの配列にすでに入力がある かつ 空文字 か、文字が入力されていればメモが作成できる
            lines.push(line);
          }
        })
        .on("close", () => {
          if (lines.length == 0) {
            // メモの配列が空の場合
            reject(new Error("Unable to create memo"));
          } else {
            resolve(lines);
          }
        });
    });
  };

  #generateQuestion = (memos, message) => {
    return {
      type: "select",
      name: "favorite",
      message: message,
      choices: memos,
      result() {
        return this.focused;
      },
    };
  };

  runQuestionForDelete = async (memos, message) => {
    const question = this.#generateQuestion(memos, message);
    const answer = this.#enquirer.prompt(question);
    return answer;
  };

  runQuestionForRead = async (memos, message) => {
    const question = this.#generateQuestion(memos, message);
    const answer = this.#enquirer.prompt(question);
    return answer;
  };

  hasNoOption = () => {
    return !this.isListOption && !this.isReadOption && !this.isDeleteOption;
  };
}

export { UserInput };
