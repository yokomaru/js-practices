class Option {
  constructor(argv, isTTY) {
    this.isDelete = !!argv.d;
    this.isList = !!argv.l;
    this.isRead = !!argv.r;
    this.isTTY = !!isTTY;
  }

  hasNoOption = () => {
    return !this.isList && !this.isRead && !this.isDelete;
  };
}

export { Option };
