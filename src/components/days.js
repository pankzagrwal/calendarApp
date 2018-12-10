import  React from 'react'

export default function Days (props) {
    const weekDays = props.weekDays;
    return (
        <div className = 'daysName'>
            {
                weekDays.map((day, index) => {
                    return (
                        <span key = {`day-${index}`} className = 'date-cell'>
                            {day}
                        </span>
                    )
                })
            }
        </div>
    )
}