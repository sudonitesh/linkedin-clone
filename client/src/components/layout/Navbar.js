import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm naavbaar-dark bg-dark mb-4">
        <div className="container">
          {/* <Link to="/landing" className="navbar-brand"> */}
            Linkedin
          {/* </Link> */}
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbaar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {/* <Link className="nav-link" to="/profiles"> */}
                  {/* {" "} */}
                  Developers
                {/* </Link> */}
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* <Link className="nav-link" to="/register"> */}
                  Sign Up
                {/* </Link> */}
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" to="/login"> */}
                  Login
                {/* </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
