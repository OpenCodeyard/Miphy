import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  //activates joinRoom function defined on the backend
  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
      //if empty error message pops up and returns to the same page
    } else {
      alert("Please Enter Username and Roomname !");
      window.location.reload();
    }
  }
  const sendData1 = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinMusicRoom", { username, roomname });
      //if empty error message pops up and returns to the same page
    } else {
      alert("Please Enter Username and Roomname !");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      <img src={logo} height={150} width={150} />
      <h1>Welcome To Miphy</h1>
      <input
        placeholder="Please Enter Your Name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        placeholder="Enter The Miphy Room Name"
        value={roomname}
        onChange={(e) => setroomname(e.target.value)}
      ></input>
      <div class="buttons">
      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>Join Chat</button>
      </Link>
      <Link to={`/game/${roomname}/${username}`}>
        <button onClick={sendData1}>Join Game</button>
      </Link>
      </div>
    </div>
  );
}

export default Homepage;