function concatenateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text.toUpperCase();
    } else {
        const truncatedText = text.slice(0, maxLength) + '...';
        return truncatedText.toUpperCase();


    }
}

function concatenateAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const result = concatenateString(inputText, maxLength);
    document.getElementById('result').textContent = result;
    console.log(result);
}

function createTableCells(rowAmount, cellsAmount) {
    const table = document.getElementById('myTable');
    table.innerHTML = '';
    const tableData = [];
    for (let i = 0; i < rowAmount; i++) {
        const row = table.insertRow();
        const rowData = [];
        for (let j = 0; j < cellsAmount; j++) {
            const cell = row.insertCell();
            const cellText = `Cell ${j + 1}`;
            cell.textContent = cellText;
            rowData.push(cellText);
        }
        tableData.push(rowData);
    }
    console.log(tableData);
}

function createAndDisplay(){
    const rows = parseInt(document.getElementById('rows').value)
    const cell = parseInt(document.getElementById('cells').value)
    createTableCells(rows, cell)
}

class Bookshelf {
    constructor(books) {
        this.books = books;
    }

    addBook(Book) {
        this.books.push(Book);
    }

    removeBook(Book) {
        const bookIndex = this.books.indexOf(Book);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
        }
    }

    getUnreadBooks() {
        return this.books.filter(Book => !Book.isRead);
    }

    getFavBooks() {
        return this.books.filter(Book => Book.isFavorite);
    }
}

class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

let shelf = new Bookshelf([])
function addBook() {
    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const pages = parseInt(document.getElementById('pages').value);
    const isRead = document.getElementById('isRead').checked;
    const isFavorite = document.getElementById('isFavorite').checked;
    const newBook = new Book(title, authors, pages, isRead, isFavorite);
    shelf.addBook(newBook);
    document.getElementById('title').value = '';
    document.getElementById('authors').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('isRead').checked = false;
    document.getElementById('isFavorite').checked = false
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear the existing list

    shelf.books.forEach(book => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.flexDirection = 'column';
        li.innerHTML = `Title: ${book.title}<br>
                        Authors: ${book.authors}<br>
                        Pages: ${book.numberOfPages}<br>
                        Read: ${book.isRead ? 'Yes' : 'No'}<br>
                        Favorite: ${book.isFavorite ? 'Yes' : 'No'}<br><br>`;

        const markAsReadButton = document.createElement('button');
        markAsReadButton.textContent = 'Mark as Read';
        markAsReadButton.onclick = () => {
            book.markAsRead();
            displayBooks();
        };

        const toggleFavoriteButton = document.createElement('button');
        toggleFavoriteButton.textContent = 'Toggle Favorite';
        toggleFavoriteButton.onclick = () => {
            book.toggleFavorite();
            displayBooks();
        };

        const deleteButton = document.createElement('button'); // Create the Delete button
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            shelf.removeBook(book);
            displayBooks();
        };

        toggleFavoriteButton.style.marginTop ="10px"
        deleteButton.style.marginTop ="10px"

        li.appendChild(markAsReadButton);
        li.appendChild(toggleFavoriteButton);
        li.appendChild(deleteButton)
        bookList.appendChild(li);
    });
}

function getUnreadBooks(){
    const unread = shelf.getUnreadBooks()
    const bookList = document.getElementById('unread');
    bookList.innerHTML = '';
    unread.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `Title: ${book.title}<br>
                        Authors: ${book.authors}<br>
                        Pages: ${book.numberOfPages}<br>
                        Read: ${book.isRead ? 'Yes' : 'No'}<br>
                        Favorite: ${book.isFavorite ? 'Yes' : 'No'}`;
        bookList.appendChild(li)
    })
}

function getFavBooks(){
    const fav = shelf.getFavBooks()
    const bookList = document.getElementById('fav');
    bookList.innerHTML = '';
    fav.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `Title: ${book.title}<br>
                        Authors: ${book.authors}<br>
                        Pages: ${book.numberOfPages}<br>
                        Read: ${book.isRead ? 'Yes' : 'No'}<br>
                        Favorite: ${book.isFavorite ? 'Yes' : 'No'}`;
        bookList.appendChild(li)
    })}
console.log(shelf)




