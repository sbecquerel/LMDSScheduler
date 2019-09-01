import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Teachers extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    calendar: PropTypes.array.isRequired,
  }

  render() {
    const { calendar } = this.props

    return (
      <div className="list-group list-group-flush">
        {calendar.map((teacher, i) => (
          <Link key={i} to={`/slots/${teacher.name}`} className={classNames("list-group-item", "list-group-item-action")}>
            {teacher.name}
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Teachers)