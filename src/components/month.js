import  React, { Component } from 'react'

import Date from './date';

export default function Month (props) {

    const {daysInMonth} = props;



    return (
        <div>
            {
                daysInMonth.map((date, index) => {
                    return (
                        <Date key = {index} day = {date}/>
                    )
                })
            }    
        </div>
    )
}