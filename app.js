const testBook = new Book('Fran', 'Test Book', 110, true);
addBookToLibrary(testBook);

const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
