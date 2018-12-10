import  React, { Component } from 'react'

export default function Date (props) {

    return (
        <div className = {"date date-cell " + (props.day.isDisabled ? 'disabled' : null)}>
            {props.day.date}
        </div>
    )
}