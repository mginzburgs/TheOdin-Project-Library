class Library {
  constructor() {
    this._books = [];
  }

  get books() {
    return this._books;
  }

  addBookToLibrary(book) {
    return this._books.push(book);
  }

  deleteBookFromLibrary(book) {
    return (this._books = this._books.filter((e) => e !== book));
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class FormHandler {
  constructor(library, bookRender) {
    this.form = document.getElementById("book-form");
    this.library = library;
    this.formListener();
    this.newBookButtonListener();
    this.bookRender = bookRender;
  }

  newBookButtonListener() {
    const newBookButton = document.querySelector(".new-book");
    newBookButton.addEventListener("click", (e) => {
      this.form.classList.toggle("active");
    });
  }

  formListener() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.getFormData();
    });

    this.form.reset();
  }

  getFormData() {
    const title = this.form.querySelector("#name").value;
    const author = this.form.querySelector("#author").value;
    const pages = this.form.querySelector("#pages").value;
    const read = this.form.querySelector("#read").value;

    const newBook = new Book(title, author, pages, read);

    this.library.addBookToLibrary(newBook);
    this.bookRender.render();
    this.form.reset();
  }
}

class BookRender {
  constructor(library) {
    this.bookList = document.querySelector(".book-list");
    this.library = library;
  }

  render() {
    this.bookList.innerHTML = "";

    this.library.books.forEach((book) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      li.textContent = `Book title: ${book.title}, Author: ${
        book.author
      }, Page Count: ${book.pages}, book read: ${
        book.read === null ? "Did no read yet !" : "Read !"
      }`;
      button.innerHTML = "delete";
      button.classList.add("delete");
      button.addEventListener("click", () => {
        this.library.deleteBookFromLibrary(book);
        this.render();
      });
      li.appendChild(button);
      this.bookList.appendChild(li);
    });
  }
}

let library = new Library();
let harryPotter = new Book("harry potter", "author test", 200, true);
let matrix = new Book("matrix", "joe", 100, false);
library.addBookToLibrary(harryPotter);
library.addBookToLibrary(matrix);
let bookRender = new BookRender(library);
let handler = new FormHandler(library, bookRender);

bookRender.render();
