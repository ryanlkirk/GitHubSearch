import React from "react";

//UI Elements
import Typography from "@material-ui/core/Typography";
import logo from "../images/github-logo.png";

const Navbar = () => {
    return (
        <nav className="nav-top">
            <div className="left-nav">
                <img className="nav-logo" src={logo} alt="github logo"></img>
                <Typography variant="h6">GitHub Search</Typography>
            </div>
            <ul className="right-nav">
                <li>
                    <Typography variant="button">
                        <a href="http://www.github.com">Visit GitHub</a>
                    </Typography>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
