// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isImportant} = appointmentDetails

  const onMarkImportant = () => {
    toggleStar(id)
  }

  const imgUrl = isImportant
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment">
      <div className="content-card1">
        <div className="headings-container">
          <p className="title-heading">{title}</p>
          <p className="appointment-date">
            Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
          </p>
        </div>
        <button
          className="star-btn"
          data-testid="star"
          type="button"
          onClick={onMarkImportant}
        >
          <img src={imgUrl} alt="star" className="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
