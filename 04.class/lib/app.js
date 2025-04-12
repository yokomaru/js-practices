class App {
  static async main(option, command) {
    if (option.hasNoOption()) {
      await command.createMemo();
      process.exit(1);
    }

    if (option.isTTY && option.isRead) {
      await command.readMemo();
      process.exit(1);
    }

    if (option.isTTY && option.isDelete) {
      await command.deleteMemo();
      process.exit(1);
    }

    if (option.isTTY && option.isList) {
      await command.displayMemoList();
      process.exit(1);
    }

    console.log("Please do not pipe in when using options");
  }
}

export { App };
