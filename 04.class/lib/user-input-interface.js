class UserInputInterface {
  #readlineInterface;
  constructor(readline) {
    this.#readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  run = () => {
    const lines = [];
    return new Promise((resolve, reject) => {
      this.#readlineInterface
        .on("line", (line) => {
          if ((lines.length != 0 && !line) || line) {
            //linesにすでに入力があるかつ空文字 か 文字が入力されていればメモが作成できる
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
}

export { UserInputInterface };
