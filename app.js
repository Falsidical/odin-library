const dialog = document.querySelector('dialog');
const showBtn = document.querySelector('.show');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');
const booksContainer = document.querySelector('.books-container');

const icons = ['circle-outline.svg', 'square-edit-outline.svg', 'trash-can-outline.svg'];

showBtn.addEventListener('click', () => {
  dialog.showModal();
});

closeBtn.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  for (const [name, value] of formData.entries()) {
    console.log(name, value);
  }
  dialog.close();
});

function createBookDiv(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  const title = document.createElement('h3');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.textContent = book.author;

  const iconsDiv = document.createElement('div');
  iconsDiv.classList.add('icons');

  for (let i = 0; i < 3; i++) {
    const icon = document.createElement('img');
    icon.src = `img/svg/${icons[i]}`;
    iconsDiv.appendChild(icon);
  }

  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(iconsDiv);

  booksContainer.appendChild(bookDiv);
}

const myLibrary = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    read: true,
  },
  {
    title: 'Games of Thrones',
    author: 'George RR Martin',
    read: false,
  },
];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

myLibrary.forEach((book) => {
  createBookDiv(book);
});
