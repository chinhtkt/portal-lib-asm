import AuthService from './Services/auth.service';
import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardUser from './Components/BoardUser';
import Category from './Components/Category';
import Profile from './Components/Profile';
import Book from './Components/Book';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryAdd from './Components/table/CategoryAdd';
import CategoryEdit from './Components/table/CategoryEdit';
import CategoryDetails from './Components/table/CategoryDetails';
import BookAdd from './Components/Booktable/BookAdd'
import BookDetails from './Components/Booktable/BookDetails';
import BookEdit from './Components/Booktable/BookEdit';
function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authorities, setAuthorities] = useState(false);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      axios
        .get('https://localhost:5001/api/category')
        .then((res) => res.data)
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => setError(err));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      axios
        .get('https://localhost:5001/api/books')
        .then((res) => res.data)
        .then((data) => {
          setBooks(data);
        })
        .catch((err) => setError(err));
    })();
  }, []);

  async function handleBooks(book) {
    console.log(book);

    try {
      await axios.post('https://localhost:5001/api/books', book);
      const res = await axios.get('https://localhost:5001/api/books');
      const data = res.data;
      setBooks(data);
    } catch (err) {
      setError(err);
    }
  }

  async function handleCategory(category) {
    console.log(category);

    try {
      await axios.post('https://localhost:5001/api/category', category);
      const res = await axios.get('https://localhost:5001/api/category');
      const data = res.data;
      setCategories(data);
    } catch (err) {
      setError(err);
    }
  }

  async function handleCategoryEdit(category) {
    await axios.put(`https://localhost:5001/api/category`, {

      CategoryId: category.id,
        Name: category.name
      
    });
    const res = await axios.get('https://localhost:5001/api/category');
    const data = res.data;
    setCategories(data);
  }

  async function handleBookEdit(book) {
    await axios.put(`https://localhost:5001/api/books`, {

      BookId: book.id,
      Name: book.name,
      Author: book.author,
      CategoryId: book.categoryId,
    });
    const res = await axios.get('https://localhost:5001/api/books');
    const data = res.data;
    setBooks(data);
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.role === 1);
      setAuthorities(true);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };


  return (
    <Router>
      <div className='App'>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            CHINHTKT
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/home'} className='nav-link'>
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/admin'} className='nav-link'>
                  Category
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/adminbook'} className='nav-link'>
                  Books
                </Link>
              </li>
            )}

            {currentUser && (
              <li className='nav-item'>
                <Link to={'/user'} className='nav-link'>
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className='container mt-3'>
          <Switch>
            <Route exact path='/home'>
              <Home currentUser={currentUser} />
            </Route>
            <Route exact path='/login'>
              <Login
                authorities={authorities}
                setAuthorities={setAuthorities}
                currentUser={currentUser}
              />
            </Route>
            <Route exact path='/profile'>
              <Profile authorities={authorities} />
            </Route>
            <Route path='/user'>
              <BoardUser authorities={authorities} books={books} setBooks={setBooks} />
            </Route>
            <Route path='/admin'>
              <Category
                authorities={authorities}
                categories={categories}
                error={error}
                setCategories={setCategories}
              />
            </Route>
            <Route path='/adminbook'>
              <Book authorities={authorities} books={books} error={error} setBooks={setBooks} />
            </Route>
            <Route path='/addcategory'>
              <CategoryAdd handleCategory={handleCategory} />
            </Route>
            <Route path='/addbook'>
              <BookAdd handleBooks={handleBooks} categories={categories}  />
            </Route>
            <Route path='/editcategory/:id'>
              <CategoryEdit
                handleCategoryEdit={handleCategoryEdit}
                categories={categories}
                setCategories={setCategories}
              />
            </Route>
            <Route path='/editbooks/:id'>
              <BookEdit
                handleBookEdit={handleBookEdit}
                books={books}
                setBooks={setBooks}
                categories={categories}
              />
            </Route>
            <Route path='/categorydetails/:id'>
              <CategoryDetails
                categories={categories}
                error={error}
                setCategories={setCategories}
              />
            </Route>
            <Route path='/bookdetails/:id'>
              <BookDetails
                books={books}
                error={error}
                setBooks={setBooks}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
