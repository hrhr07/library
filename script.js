function Book(title, author, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, not read yet`;
  };
}
