const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');
const booksContainer = document.querySelector('.books-container');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const myLibrary = [];
let formNewBook = true;
let bookIndex = null;

const iconsSrc = {
  read: 'img/svg/check-circle-outline.svg',
  notRead: 'img/svg/circle-outline.svg',
  edit: 'img/svg/square-edit-outline.svg',
  remove: 'img/svg/trash-can-outline.svg',
};

closeBtn.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = new Book(authorInput.value, titleInput.value, pagesInput.value, readInput.checked);
  if (formNewBook) {
    addBookToLibrary(newBook);
  } else {
    myLibrary[bookIndex] = newBook;
  }
  formNewBook = true;
  clearInputs();
  refreshBooksContainer();
  dialog.close();
});

function createBookDiv(book, index) {
  const bookDiv = document.createElement('div');
  bookDiv.dataset.index = index;
  bookDiv.classList.add('book');
  const title = document.createElement('h3');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = `Written by ${book.author}`;
  const pages = document.createElement('p');
  pages.textContent = `${book.pages} Pages`;
  const iconsDiv = document.createElement('div');
  iconsDiv.classList.add('icons');

  const readIcon = document.createElement('img');
  book.read ? (readIcon.src = iconsSrc.read) : (readIcon.src = iconsSrc.notRead);
  readIcon.addEventListener('click', () => {
    myLibrary[index].toggleRead();
    refreshBooksContainer();
  });
  iconsDiv.appendChild(readIcon);

  const editIcon = document.createElement('img');
  editIcon.src = iconsSrc.edit;
  iconsDiv.appendChild(editIcon);
  editIcon.addEventListener('click', () => {
    formNewBook = false;
    bookIndex = index;
    titleInput.value = book.title;
    authorInput.value = book.author;
    pagesInput.value = book.pages;
    readInput.checked = book.read;
    dialog.showModal();
  });

  const removeIcon = document.createElement('img');
  removeIcon.src = iconsSrc.remove;
  removeIcon.addEventListener('click', () => {
    removeBookFromLibrary(index);
  });
  iconsDiv.appendChild(removeIcon);
  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(pages);
  bookDiv.appendChild(iconsDiv);
  booksContainer.appendChild(bookDiv);
}

function createNewBookDiv() {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.classList.add('newbook');
  bookDiv.classList.add('show');
  const p = document.createElement('p');
  p.textContent = 'Add new book';
  const icon = document.createElement('img');
  icon.src = `img/svg/plus-circle-outline.svg`;
  bookDiv.appendChild(p);
  bookDiv.appendChild(icon);
  bookDiv.addEventListener('click', () => {
    dialog.showModal();
  });
  booksContainer.appendChild(bookDiv);
}

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function refreshBooksContainer() {
  booksContainer.replaceChildren();
  myLibrary.forEach((book, index) => {
    createBookDiv(book, index);
  });
  createNewBookDiv();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  refreshBooksContainer();
}

function clearInputs() {
  authorInput.value = '';
  titleInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;
}

const book1 = new Book('JK Rowling', 'Harry Potter', '400', true);
addBookToLibrary(book1);

const book2 = new Book('George Orwell', 'Animal Farm', '300', true);
addBookToLibrary(book2);

refreshBooksContainer();
