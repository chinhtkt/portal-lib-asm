import React from 'react';
import AuthService from '../Services/auth.service';
import '../App.css';
import {Redirect } from "react-router-dom";
function Home({authorities}) {

  if(!authorities) {
    return <Redirect to ="/home" />
  }
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className='App'>
      <h2 className='Name'>Welcome {currentUser.username}</h2>
      <strong>Authorities:</strong>
        <p>{currentUser.role === 1? "Admin" : "User"}</p>

    </div>
  );
}

export default Home;
