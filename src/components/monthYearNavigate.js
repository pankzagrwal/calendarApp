import  React, { Component } from 'react'

import Date from './date';

export default function Navigate (props) {

    const currentDate = props.currentDate;

    const optionsMonth = props.allMonths.map((month, index) => {
        return (
            <option  key = {`month-${index}`} value = {index + 1} >{month}</option >
        )
    })

    const optionsYear = props.allYears.map ((year, index) => {
        return (
            <option  key = {`year-${index}`} value = {year} >{year}</option >
        )
    })


    return (
        <div className = 'navigate'>    
            <div className = 'next-prev'>
                <button className = 'prev' onClick = {props.previousMonthClicked}>
                    PREVIOUS MONTH
                </button>
                <button className = 'next' onClick = {props.nextMonthClicked}>
                    NEXT MONTH
                </button>
            </div>

            <div className = 'month-year-dropdown'>
                    <select value = {props.currentDate.month() + 1} onChange = {(e) => {
                        props.onMonthChange(e.target.value)
                    }}>
                        {
                            optionsMonth
                        }
                    </select>

                    <select value = {props.currentDate.year()} onChange = {(e) => {
                        props.onYearChange(e.target.value)
                    }}>
                        {
                            optionsYear
                        }
                    </select>
            </div>
        </div>
    )
}