import Quotes from "./quotes/quotes";
import Home from "./home/home";
import Welcome from "./welcome/welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React from "react";
import io from "socket.io-client";
import Music from "./musicchat/musicchat";
import Game from "./game/game";
const socket = io.connect('/');

function AppmainGame() {
  return (
    <React.Fragment>
      <div className="right">
        <Quotes
        />
      </div>
      <div className="left">
        <Game />
      </div>
    </React.Fragment>
  );
}

function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        <Music
        />
      </div>
      <div className="left">
        <Quotes />
      </div>
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/music" component={Appmain} />
          <Route path="/game" component={AppmainGame} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;