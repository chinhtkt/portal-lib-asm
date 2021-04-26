import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../Services/auth.service';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import './css/Button.css';
import axios from 'axios';
function Book({ authorities, books, error, setBooks }) {
  if (!authorities) {
    return <Redirect to='/login' />;
  }

  const User = AuthService.getCurrentUser();

  const deleteBook = async (id) => {
    if (window.confirm('do you want to delete')) {
      await axios.delete(`https://localhost:5001/api/books/${id}`);
      const res = await axios.get('https://localhost:5001/api/books');
      const data = res.data;
      setBooks(data);
    }
  };

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h2>Welcome {User.username} to manage books!</h2>
      </header>
      <div className='container-2'>
        <Link to={'/addbook'}>
          <Button variant='success'>Add new</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.length > 0 &&
            books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.bookId}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.category.name}</td>
                <Link to={`/bookdetails/${book.bookId}`}>
                  <Button variant='primary'>Details</Button>
                </Link>
                &nbsp;
                <Link to={`/editbooks/${book.bookId}`}>
                  <Button variant='success'>Edit</Button>
                </Link>
                &nbsp;
                <Button
                  variant='danger'
                  onClick={() => deleteBook(book.bookId)}
                >
                  Delete
                </Button>
              </tr>
            ))}
          {error && <p>Something went wrong!</p>}
        </tbody>
      </Table>
    </div>
  );
}

export default Book;
