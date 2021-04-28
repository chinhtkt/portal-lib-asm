 import React from 'react'
import { ListGroup,Button } from 'react-bootstrap';
import {Redirect, useParams, Link } from "react-router-dom";

function BookDetails({authorities, books}) {
    const {id} = useParams();

    if(!authorities) {
        return <Redirect to ="/home" />
      }
    return (
        <div>
         {books &&
        books.length > 0 &&
        books.map((book) => (
            <div key={book.bookId}>
            {book.bookId == id &&<ListGroup >
            <ListGroup.Item ><h4><strong>ID:</strong>  {book.bookId}</h4></ListGroup.Item>
            <ListGroup.Item><h4><strong>Name:</strong> {book.name}</h4></ListGroup.Item>
            <ListGroup.Item><h4><strong>Author:</strong> {book.author}</h4></ListGroup.Item>
            <ListGroup.Item><h4><strong>Category:</strong> {book.category.name <= 0 ? <h4>No category found!</h4> : <h3>{book.category.name}</h3>}</h4></ListGroup.Item>
            <Link to={'/adminbook'}>
            <br></br>
          <Button>
          Go Back
          </Button>
          </Link>
          </ListGroup>}
            
            </div>
          

        ))}
        </div>
    )
}

export default BookDetails
