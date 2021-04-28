import React  from "react";
import { Table,Button } from "react-bootstrap";
import {Redirect } from "react-router-dom";
const BoardUser = ({authorities ,books, error, setBooks}) => {

  if(!authorities) {
    return <Redirect to ="/login" />
  }

  
  return (
    <div className="container">
    <br></br>
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
                <Button variant='primary'>Borrow</Button>
              </tr>
            ))}
          {error && <p>Something went wrong!</p>}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardUser;