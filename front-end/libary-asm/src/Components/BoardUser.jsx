import React  from "react";
import {Redirect } from "react-router-dom";

const BoardUser = ({authorities}) => {

  if(!authorities) {
    return <Redirect to ="/login" />
  }

  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome </h3>
      </header>
    </div>
  );
};

export default BoardUser;