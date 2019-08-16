import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import classNames from 'classnames';

const Navbar = withRouter(({routes, location}) => (
  <ul className="nav nav-pills nav-fill">
    {routes.map((route, i) => (
    <li key={i} className="nav-item">
      <Link className={classNames("nav-link", location.pathname === route.pathname ? "active" : "")} to={route.pathname}>{route.label}</Link>
    </li>
    ))}
  </ul>
));

export default Navbar;