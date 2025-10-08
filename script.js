const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const confirmBtn = document.getElementById("confirmBtn");

const myLibrary = [];

class Book {
  constructor(title, author, pages) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = false;
  }
}

Book.prototype.getStatus = function () {
  if (this.status) {
    return `${this.title} by ${this.author}, ${this.pages}, has been read`;
  } else {
    return `${this.title} by ${this.author}, ${this.pages}, not read yet`;
  }
};

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}

function displayLibrary(parent, myLibrary) {
  var html = "";
  myLibrary.forEach(function (book) {
    let itemTemplate = `
  <li> 
     <h2>${book.title}</h2>
     <p>Author: ${book.author}</p>
     <p>Pages: ${book.pages}</p>
     <p>Id: ${book.id}</p>
     <p>Status: ${book.getStatus()}</p>
     <div class="Actionbtns">
     <button class="remove-btn" data-book-id="${book.id}">Remove Book</button>
     <button class="status-btn" data-book-id="${book.id}">Change Status</button>
     </div>
  </li>`;
    html += itemTemplate;
  });
  parent.innerHTML += html;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const bookId = event.target.dataset.bookId;
    const index = myLibrary.findIndex(function (book) {
      return book.id === bookId;
    });

    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    displayLibrary(bookList, myLibrary);
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("status-btn")) {
    const bookId = event.target.dataset.bookId;
    const index = myLibrary.findIndex(function (book) {
      return book.id === bookId;
    });

    if (index !== -1) {
      myLibrary[index].status = !myLibrary[index].status;
    }
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    displayLibrary(bookList, myLibrary);
  }
});

showButton.addEventListener("click", () => {
  favDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const bookName = document.getElementById("bookName").value;
  const authorName = document.getElementById("authorName").value;
  const pages = document.getElementById("pages").value;

  addBookToLibrary(bookName, authorName, pages);

  myLibrary[myLibrary.length - 1].id = crypto.randomUUID();

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  displayLibrary(bookList, myLibrary);

  favDialog.close();
  document.getElementById("bookForm").reset();
});
