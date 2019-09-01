import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'moment'

const Slots = ({match, calendar}) => {
  const 
    teacherName = decodeURIComponent(match.params.teacher_name),
    teacher = calendar.find(teacher => teacher.name === teacherName),
    currentDay = moment().format('dddd')

  if (teacher === undefined) {
    return <div>Undefined calendar for teacher {teacherName}</div>
  }

  return (
    <div>
      <h1 className="text-center">{teacherName}</h1>
      <div className="list-group list-group-flush">
          {teacher.slots.map((slot, i) => (
          <Link key={i} to={`/students/${encodeURIComponent(teacherName)}/${i}`} className={classNames(
            "list-group-item", 
            "list-group-item-action",
            (currentDay === slot.day ? "font-weight-bold" : "text-muted")
            )}>
              {slot.day.charAt(0).toUpperCase()}{slot.day.slice(1)} {slot.hour}h{slot.minutes > 0 ? slot.minutes : ''}
          </Link>
          )
          )}
      </div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Slots);
