// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', appointmentList: [], date: '', starred: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isImportant: !eachAppointment.isImportant}
        }
        return eachAppointment
      }),
    }))
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newListItem = {
      id: uuidv4(),
      title,
      date,
      isImportant: false,
    }
    if (date !== '' && title !== '') {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newListItem],
        title: '',
        date: '',
      }))
    }
  }

  starredAppointments = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {title, appointmentList, date, starred} = this.state
    let searchResult = appointmentList
    if (starred === true) {
      searchResult = appointmentList.filter(
        eachAppointment => eachAppointment.isImportant === true,
      )
    }
    const colorChange = starred ? 'change' : ''

    return (
      <div className="appointment-container">
        <div className="content-card">
          <h1 className="heading">Add Appointment</h1>
          <div className="details-image-container">
            <form className="details-container">
              <label htmlFor="title1" className="label">
                TITLE
              </label>
              <input
                id="title1"
                type="text"
                value={title}
                onChange={this.onChangeTitle}
                className="title-input"
                placeholder="Title"
              />
              <label htmlFor="date1" className="label">
                DATE
              </label>
              <input
                id="date1"
                type="date"
                value={date}
                onChange={this.onChangeDate}
                className="date-input"
              />
              <button
                type="submit"
                className="button"
                onClick={this.onClickSubmit}
              >
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <div className="starred-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className={`btn-starred ${colorChange}`}
                type="button"
                onClick={this.starredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {searchResult.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
