class UserInputInterface {
  constructor(readline) {
    this.readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  run = (lines) => {
    return new Promise((resolve) => {
      this.readlineInterface
        .on("line", (line) => {
          lines.push(line);
        })
        .on("close", () => {
          resolve(lines);
        });
    });
  };
}

export { UserInputInterface };
