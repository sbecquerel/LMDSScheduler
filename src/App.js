import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import About from './Components/About/About'
import Navbar from './Components/Navbar/Navbar'
import Slots from './Components/Slots/Slots'
import Students from './Components/Students/Students'
import StudentsOnSite from './Components/StudentsOnSite/StudentsOnSite'

const routes = [
  {
    label: "Home",
    pathname: "/"
  },
  {
    label: "About",
    pathname: "/about"
  }
]

const App = () => (
  <Router>
    <div>
      <Navbar routes={routes}/>
      <Route exact path="/" component={StudentsOnSite} />
      <Route path="/about" component={About} />
      <Route path="/slots/:teacher_name" component={Slots} />
      <Route path="/students/:teacher_name/:ts" component={Students} />
    </div>
  </Router>
)

export default App
