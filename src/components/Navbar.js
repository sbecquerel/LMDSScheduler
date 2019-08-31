import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import { useAuth0 } from '../auth/auth0Wrapper'
import { fetchResult } from '../actions'

const Navbar = withRouter(({location}) => {
  const { logout } = useAuth0();
  
  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <Link className={classNames('nav-link', location.pathname === '/' ? 'active' : '')} to='/'>Profs</Link>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link" onClick={() => fetchResult()}>Présence</a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link" onClick={() => logout()}>Déconnexion</a>
      </li>
    </ul>
  )
})

export default Navbar
