class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.name = this.#generateDisplayName();
  }

  #generateDisplayName = () => {
    const slicedName = this.content?.slice(0, this.content?.indexOf("\n"));
    return !slicedName ? "No Title" : slicedName;
  };
}

export { Memo };
