class Book {
  constructor(title, author, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this._bookshelf = [];
  }

  set bookshelf(bookshelf) {
    this._bookshelf = bookshelf;
  }

  get bookshelf() {
    return this._bookshelf;
  }

  addBookToBookshelf(book) {
    this.bookshelf.push(book);
  }

  removeBook(index) {
    this.bookshelf.splice(index, 1);
  }

  createBook(title, author, pages, read, index) {
    const newBook = new Book(title, author, pages, read);
    index ? (this.bookshelf[index] = newBook) : this.addBookToBookshelf(newBook);
  }

  toggleRead(index) {
    this.bookshelf[index].toggleRead();
  }
}

const myLibrary = new Library();
myLibrary.createBook('Harry Potter', 'JK Rowling', '400', true);
myLibrary.createBook('Animal Farm', 'George Orwell', '300', true);
export { myLibrary };
