// Global array to store book objects
const myLibrary = [];

// 1️⃣ Constructor for Book
function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID(); // Unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// 2️⃣ Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// 3️⃣ Add book to library array
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  renderBooks();
}

// 4️⃣ Render all books in the UI
function renderBooks() {
  const container = document.getElementById("libraryDisplay");
  container.innerHTML = ""; // Clear previous display

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id; // Associate with book ID

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? "Read ✅" : "Not read ❌"}</p>
      <button class="toggle-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    // Toggle read button
    card.querySelector(".toggle-btn").addEventListener("click", () => {
      const foundBook = myLibrary.find((b) => b.id === book.id);
      foundBook.toggleRead();
      renderBooks(); // re-render UI
    });

    // Remove button
    card.querySelector(".remove-btn").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      myLibrary.splice(index, 1);
      renderBooks();
    });

    container.appendChild(card);
  });
}

// 5️⃣ Handle form submission
const form = document.getElementById("bookForm");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  form.reset();
  form.style.display = "none";
});

// 6️⃣ Show form when clicking "New Book"
document.getElementById("newBookBtn").addEventListener("click", () => {
  const form = document.getElementById("bookForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// Optional: Add a few default books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
