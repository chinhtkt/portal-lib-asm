import React from "react";

const Home = ({currentUser}) => {


  return (
    <div className="container">
      <header className="jumbotron">
        <div>{currentUser == null ? (<h2>Welcome,Please Login!</h2>) : (<h2>Welcome {currentUser.username}</h2>)}</div>
      </header>
    </div>
  );
};

export default Home;