class Option {
  constructor(argv, isTTY) {
    this.isList = !!argv.l;
    this.isRead = !!argv.r;
    this.isDelete = !!argv.d;
    this.isTTY = !!isTTY;
  }

  hasNoOption = () => {
    return !this.isList && !this.isRead && !this.isDelete;
  };
}

export { Option };
