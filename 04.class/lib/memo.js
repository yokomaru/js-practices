class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.name = this.#generateDisplayName();
  }

  #generateDisplayName = () => {
    return this.content?.split("\n")[0];
  };
}

export { Memo };
