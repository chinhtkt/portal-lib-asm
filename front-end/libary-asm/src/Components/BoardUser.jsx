import React  from "react";
import { Table } from "react-bootstrap";
import {Redirect } from "react-router-dom";
import AuthService from '../Services/auth.service';
const BoardUser = ({authorities ,books, error, setBooks}) => {

  if(!authorities) {
    return <Redirect to ="/login" />
  }

  const User = AuthService.getCurrentUser();

  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome {User.username} </h3>
      </header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Category</th>
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
              </tr>
            ))}
          {error && <p>Something went wrong!</p>}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardUser;