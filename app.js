const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} ${this.read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function getBooks() {
  myLibrary.forEach((e) => console.log(e));
}

const book1 = new Book("the great Mike", "M.G", "256 pages", true);
const book2 = new Book("the great Emma", "E.G", "100 pages", false);

const NewBookButton = document.querySelector(".new-book");
const form = document.querySelector(".form");

function submitBook(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const bookName = formData.get("name");
  const bookAuthor = formData.get("author");
  const pageCount = formData.get("pages");
  const isRead = formData.get("read");

  let createdBook = new Book(bookName, bookAuthor, pageCount, isRead);
  addBookToLibrary(createdBook);
  form.reset();
}

form.addEventListener("submit", (e) => {
  submitBook(e);
  form.classList.toggle("active");
  createList();
});

NewBookButton.addEventListener("click", () => {
  form.classList.toggle("active");
});

function createList() {
  let bookList = document.querySelector(".book-list");
  bookList.innerHTML = "";
  const fragment = new DocumentFragment();

  myLibrary.forEach((e) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.textContent = `Book title: ${e.title}, Author: ${
      e.author
    }, Page Count: ${e.pages}, book read: ${
      e.read === null ? "Did no read yet !" : "Read !"
    }`;
    button.innerHTML = "delete";
    button.classList.add("delete");
    button.addEventListener("click", (e) => {
      deleteBook(e);
    });
    li.append(button);
    fragment.append(li);
  });
  bookList.append(fragment);
}

function deleteBook(e) {

  const listItem = e.target.parentNode; // Get the <li> element
  const bookTitle = listItem.textContent.match(/Book title: (.*?),/)[1]; // Extract the book title

  // Find the index of the book in myLibrary based on the title
  const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1); // Remove the book from the array
  }
  
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}
