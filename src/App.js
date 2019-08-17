import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import About from './components/About'
import Navbar from './components/Navbar'
import Slots from './components/Slots'
import Students from './components/Students'
import Teachers from './components/Teachers'
import { useAuth0 } from "./auth/auth0Wrapper";

const routes = [
  {
    label: "Profs",
    pathname: "/"
  },
  {
    label: "A propos",
    pathname: "/about"
  }
]

const App = () => {  
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (loading) {
    return <div className="alert alert-primary" role="alert">Chargement...</div>
  }

  /*if (!isAuthenticated) {
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: '/' }
      })
    }
    fn()
    return <div className="alert alert-primary" role="alert">Redirection pour authentification</div>
  }*/

  return (
    <Router>
      <div>
        <Navbar routes={routes}/>
        <Route exact path="/" component={Teachers} />        
        <Route path="/slots/:teacher_name" component={Slots} />
        <Route path="/students/:teacher_name/:ts" component={Students} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  )
}

export default App
