import React from 'react'
import logo from "./logo.png";
import "./welcome.scss";
import { Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="homepage">
        <img src={logo} height={220} width={220} />
        <h1>Welcome to Miphy</h1>
<div class="buttons">
        <Link to={`/music`}>
        <button logIn={true}>Join Music</button>
      </Link>
	<Link to={`/game`}>
        <button logIn={true}>Join Game</button>
      </Link>
</div>
        </div>
    )
}

export default LoginPage;