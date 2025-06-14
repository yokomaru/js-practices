class App {
  static async main(command) {
    if (command.userInput.hasNoOption()) {
      await command.createMemo();
      process.exit(1);
    }

    if (command.userInput.isTTY && command.userInput.isDeleteOption) {
      await command.deleteMemo();
      process.exit(1);
    }

    if (command.userInput.isTTY && command.userInput.isListOption) {
      await command.displayMemoList();
      process.exit(1);
    }

    if (command.userInput.isTTY && command.userInput.isReadOption) {
      await command.readMemo();
      process.exit(1);
    }

    console.log("Please do not pipe in when using options");
  }
}

export { App };
