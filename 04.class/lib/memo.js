class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.name = this.#generateDisplayName();
  }

  #generateDisplayName = () => {
    const slicedName = this.content?.split("\n")[0];
    return !slicedName ? "No Title" : slicedName;
  };
}

export { Memo };
