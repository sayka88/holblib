document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Здесь можно добавить логику проверки учетных данных
            // Например, проверка на сервере или в локальном хранилище

            // Если учетные данные верны, перенаправляем на главную страницу
            if (username === 'user' && password === 'password') {
                alert('Login successful!');
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

            // Здесь можно добавить логику регистрации нового пользователя
            // Например, отправка данных на сервер или сохранение в локальном хранилище

            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }

    const booksContainer = document.getElementById('booksContainer');

    if (booksContainer) {
        const books = [
            { title: 'Software Developers', author: 'John Sonmez', img: 'images/softw.jpg', rating: 4 },
            { title: 'The Martian Chronicles', author: 'Ray Bradbury', img: 'images/hack.jpg', rating: 5 },
            { title: 'Volatiles in the Martian Crust', author: 'Justin Filiberto, Susanne P. Schwenzer', img: 'images/python.jpg', rating: 3 },
            { title: 'Software Developers', author: 'John Sonmez', img: 'images/softw.jpg', rating: 4 },
            { title: 'Artemis: A Novel', author: 'Andy Weir', img: 'images/hack.jpg', rating: 5 },
            { title: 'The Big Book', author: 'Marc Hartzman', img: 'images/python.jpg', rating: 4 }
        ];

        let bookRow = document.createElement('div');
        bookRow.classList.add('book-row');

        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${book.img}" alt="${book.title}">
                <div class="book-details">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <button onclick="redirectToLogin()">Add to shelf</button>
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
});

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
