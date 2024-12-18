document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Проверка учетных данных в localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert('Login successful!');
                localStorage.setItem('currentUser', username);
                sessionStorage.setItem('tempUser', username); // Временно сохраняем имя пользователя
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Сохранение данных в localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(u => u.username === username)) {
                alert('Username already exists. Please choose a different one.');
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            }
        });
    }
});



bookScript.js

const books = [
    { id: 1, title: 'Software Developers', author: 'John Sonmez', img: 'images/softw.jpg', description: 'A comprehensive guide to becoming a software developer.', rating: 4 },
    { id: 2, title: 'The Martian Chronicles', author: 'Ray Bradbury', img: 'images/hack.jpg', description: 'A collection of short stories about the colonization of Mars.', rating: 5 },
    { id: 3, title: 'Volatiles in the Martian Crust', author: 'Justin Filiberto, Susanne P. Schwenzer', img: 'images/python.jpg', description: 'A scientific exploration of the volatiles found in the Martian crust.', rating: 3 },
    { id: 4, title: 'Software Developers', author: 'John Sonmez', img: 'images/softw.jpg', description: 'A comprehensive guide to becoming a software developer.', rating: 4 },
    { id: 5, title: 'Artemis: A Novel', author: 'Andy Weir', img: 'images/hack.jpg', description: 'A thrilling novel about a heist on the moon.', rating: 5 },
    { id: 6, title: 'The Big Book', author: 'Marc Hartzman', img: 'images/python.jpg', description: 'A comprehensive history of Mars exploration.', rating: 4 }
];

document.addEventListener('DOMContentLoaded', function() {
    const booksContainer = document.getElementById('booksContainer');

    if (booksContainer) {
        let bookRow = document.createElement('div');
        bookRow.classList.add('book-row');

        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${book.img}" alt="${book.title}">
                <div class="book-details">
                    <h3 onclick="openModal('${book.id}', '${book.title}', '${book.author}', '${book.img}', '${book.description}')">${book.title}</h3>
                    <p>${book.author}</p>
                    <button onclick="addToShelf('${book.id}')">Add to shelf</button>
                </div>
            `;
            bookRow.appendChild(bookItem);

            if ((index + 1) % 3 === 0 || index === books.length - 1) {
                booksContainer.appendChild(bookRow);
                bookRow = document.createElement('div');
                bookRow.classList.add('book-row');
            }
        });
    }

    const myLibraryContainer = document.getElementById('myLibraryContainer');
    if (myLibraryContainer) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userLibrary = JSON.parse(localStorage.getItem(`library_${currentUser}`)) || [];
            console.log('User Library:', userLibrary); // Отладочная информация
            userLibrary.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <img src="${book.img}" alt="${book.title}">
                    <div class="book-details">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                        <button onclick="removeFromShelf('${book.id}')">Remove from shelf</button>
                        <button onclick="addToFavorites('${book.id}')">Add to favorites</button>
                    </div>
                `;
                myLibraryContainer.appendChild(bookItem);
            });
        }
    }

    const myFavoritesContainer = document.getElementById('myFavoritesContainer');
    if (myFavoritesContainer) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`)) || [];
            console.log('User Favorites:', userFavorites); // Отладочная информация
            userFavorites.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <img src="${book.img}" alt="${book.title}">
                    <div class="book-details">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                        <button onclick="removeFromFavorites('${book.id}')">Remove from favorites</button>
                    </div>
                `;
                myFavoritesContainer.appendChild(bookItem);
            });
        }
    }

    // Обновление навигационной панели после входа
    const tempUser = sessionStorage.getItem('tempUser');
    if (tempUser) {
        updateAuthLinks(tempUser);
        sessionStorage.removeItem('tempUser'); // Удаляем временное имя пользователя
    } else {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            updateAuthLinks(currentUser);
        }
    }
});

function updateAuthLinks(username) {
    const authLinks = document.getElementById('authLinks');
    const loginLink = authLinks.querySelector('a[href="login.html"]');
    const userDropdown = document.getElementById('userDropdown');
    const dropbtn = userDropdown.querySelector('.dropbtn');

    if (loginLink) {
        loginLink.style.display = 'none';
    }

    if (userDropdown) {
        dropbtn.textContent = username;
        userDropdown.style.display = 'inline-block';
    }
}

function addToShelf(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userLibrary = JSON.parse(localStorage.getItem(`library_${currentUser}`)) || [];
        const book = books.find(b => b.id === id);
        if (book && !userLibrary.some(b => b.id === id)) {
            userLibrary.push(book);
            localStorage.setItem(`library_${currentUser}`, JSON.stringify(userLibrary));
            alert('Book added to your library!');
            console.log('Updated Library:', userLibrary); // Отладочная информация
        } else {
            alert('Book is already in your library.');
        }
    } else {
        alert('Please login to add books to your library.');
    }
}

function removeFromShelf(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userLibrary = JSON.parse(localStorage.getItem(`library_${currentUser}`)) || [];
        const updatedLibrary = userLibrary.filter(book => book.id !== id);
        localStorage.setItem(`library_${currentUser}`, JSON.stringify(updatedLibrary));
        console.log('Updated Library:', updatedLibrary); // Отладочная информация
        alert('Book removed from your library!');
        location.reload();
    } else {
        alert('Please login to remove books from your library.');
    }
}

function addToFavorites(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`)) || [];
        const book = books.find(b => b.id === id);
        if (book && !userFavorites.some(b => b.id === id)) {
            userFavorites.push(book);
            localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(userFavorites));
            alert('Book added to your favorites!');
            console.log('Updated Favorites:', userFavorites); // Отладочная информация
        } else {
            alert('Book is already in your favorites.');
        }
    } else {
        alert('Please login to add books to your favorites.');
    }
}

function removeFromFavorites(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`)) || [];
        const updatedFavorites = userFavorites.filter(book => book.id !== id);
        localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(updatedFavorites));
        console.log('Updated Favorites:', updatedFavorites); // Отладочная информация
        alert('Book removed from your favorites!');
        location.reload();
    } else {
        alert('Please login to remove books from your favorites.');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert('Logout successful!');
    window.location.href = 'login.html';
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const booksContainer = document.getElementById('booksContainer');
    const bookItems = booksContainer.getElementsByClassName('book-item');

    for (let item of bookItems) {
        const title = item.getElementsByTagName('h3')[0].textContent.toLowerCase();
        if (title.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
}

function openModal(id, title, author, img, description) {
    const modal = document.getElementById('bookModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalImg = document.getElementById('modalImg');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.textContent = title;
    modalAuthor.textContent = `Author: ${author}`;
    modalImg.src = img;
    modalDescription.textContent = description;

    modal.style.display = 'block';

    // Извлечение отзывов из localStorage
    const reviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
    const modalReviews = document.getElementById('modalReviews');
    modalReviews.innerHTML = '';
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        reviewElement.innerHTML = `
            <p><strong>Rating:</strong> ${review.rating}</p>
            <p><strong>Review:</strong> ${review.review}</p>
        `;
        modalReviews.appendChild(reviewElement);
    });
}

function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.style.display = 'none';
}

function goToReviewPage(id, title, author, img, description) {
    localStorage.setItem('currentBookId', id);
    localStorage.setItem('currentBook', title);
    localStorage.setItem('currentAuthor', author);
    localStorage.setItem('currentImg', img);
    localStorage.setItem('currentDescription', description);
    window.location.href = 'review.html';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
