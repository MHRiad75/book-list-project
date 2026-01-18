// Select elements
const bookName = document.getElementById('bookName');
const authorName = document.getElementById('authorName');
const addBookBtn = document.getElementById('addBook');
const bookList = document.getElementById('bookList');

// Load data when page reloads
document.addEventListener('DOMContentLoaded', function () {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  books.forEach(b => {
    createRow(b.book, b.author);
  });
});

// Add book
addBookBtn.addEventListener('click', function () {
  if (bookName.value === '' || authorName.value === '') {
    alert('Please fill all fields');
    return;
  }

  createRow(bookName.value, authorName.value);
  saveToLocalStorage(bookName.value, authorName.value);

  bookName.value = '';
  authorName.value = '';
});

// Create table row
function createRow(book, author) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${book}</td>
    <td>${author}</td>
    <td><button class="delete">Delete</button></td>
  `;

  bookList.appendChild(tr);
}

// Delete book (event bubbling)
bookList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    const row = e.target.parentElement.parentElement;
    removeFromLocalStorage(row);
    row.remove();
  }
});

// Save to localStorage
function saveToLocalStorage(book, author) {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books.push({ book, author });
  localStorage.setItem('books', JSON.stringify(books));
}

// Remove from localStorage
function removeFromLocalStorage(row) {
  let books = JSON.parse(localStorage.getItem('books'));
  const bookName = row.children[0].innerText;

  books = books.filter(b => b.book !== bookName);
  localStorage.setItem('books', JSON.stringify(books));
}
 