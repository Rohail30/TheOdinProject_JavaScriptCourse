function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(
      this.title +
        '. ' +
        this.author +
        ', ' +
        this.pages +
        ' pages, ' +
        this.read +
        ' yet'
    );
  };
}

const book1 = new Book('The Hobbit by J.R.R', 'Tolkien', '295', 'not read');
book1.info();
