import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCalendar } from '../actions'
import Navbar from './Navbar'
import Slots from './Slots'
import Students from './Students'
import Teachers from './Teachers'

class Controller extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(fetchCalendar())
  }

  render() {
    const { isFetching } = this.props

    if (isFetching === true) {
      return (
        <div className="alert alert-primary" role="alert">
          <p>Récupération des données...</p>
          <small>Veuillez recharger si ce message persiste</small>
        </div>
      )
    }

    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Teachers} />        
          <Route path="/slots/:teacher_name" component={Slots} />
          <Route path="/students/:teacher_name/:slot_index" component={Students} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Controller)