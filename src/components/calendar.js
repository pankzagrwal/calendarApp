import  React, { Component } from 'react'
import moment from 'moment';
import { withRouter } from 'react-router'
import qs from 'query-string';

import Month from './month';
import Days from './days';
import Navigate from './monthYearNavigate';

class Calendar extends Component {
    constructor (props) {
        super (props);


        this.state = {
            weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            currentDate: moment(new Date())
        }

        this.monthChange = this.monthChange.bind(this);
        this.yearChange = this.yearChange.bind(this);
        this.previousClicked = this.previousMonthClicked.bind(this);
        this.nextClicked = this.nextMonthClicked.bind(this);


    }

    getMonthDays (currentDate) {
        let clonedCurrentDate = moment(currentDate);
        const numberOfDaysInMonth = clonedCurrentDate.daysInMonth();
        
        let startOfMonthDay = clonedCurrentDate.startOf('month').day();
        const endOfMonthDay = clonedCurrentDate.endOf('month').day();

        const lastOfMonth = moment(clonedCurrentDate.endOf('month'));
        const startOfMonth = moment(clonedCurrentDate.startOf('month'));
        

        let daysInMonth = [];
        let counter = 1

        let cloneCurrentDate = moment(currentDate);

        // Current Month Dates
        for (; counter <= numberOfDaysInMonth; counter++) {

            daysInMonth.push({
                date: counter
            })
        }

        // Previous Month Dates if Any
        if (startOfMonthDay === 0) { //Special check for sunday as 1st day
            startOfMonthDay = 7
        }

        for (counter = 1; counter < startOfMonthDay; counter++) {
            daysInMonth.unshift({
                date: startOfMonth.subtract(1, 'days').date(),
                isDisabled: true
            })
        }

        // last Month Dates If Any

        for (counter = endOfMonthDay; counter < 7 && endOfMonthDay != 0; counter++) {
            
            daysInMonth.push({
                date: lastOfMonth.add(1, 'days').date(),
                isDisabled: true
            })
        }

        return daysInMonth;

    }

    componentDidMount () {

        let newDate = null;

        const search = this.props.history.location.search.substring(1);

        const queryObject = qs.parse(search);
        if (queryObject.month) {
            newDate = moment(`${queryObject.year}-${queryObject.month}-01`);
            this.setState({
                currentDate: newDate
            })
        }

    }

    // For Simplicity, Year is of range from 2000 - 2029

    getAllYears () {
        let startYear = 2000; //Start Year
        let allYears = [];

        for (let i = 0; i < 30; i++) {
            allYears.push(startYear++);
        }

        return allYears;
    }

    monthChange(month) {
        //update Query Params for Month

        const currentDate = this.state.currentDate;

        // const currentMonth = currentDate.month();
        const currentYear = currentDate.year();


        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: `?month=${month}&year=${currentYear}`
        });

        const newDate = moment(`${currentYear}-${month}-01`);

        this.setState({
            currentDate: newDate
        })

    }

    yearChange(year) {
        //update Query Params for Year
        const currentDate = this.state.currentDate;

        const currentMonth = currentDate.month() + 1;
        //const currentYear = currentDate.year();


        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: `?month=${currentMonth}&year=${year}`
        });

        const newDate = moment(`${year}-${currentMonth}-01`);

        this.setState({
            currentDate: newDate
        })
    }

    previousMonthClicked() {
        // Updaet Query Param for Month and Year
        const currentDate = this.state.currentDate;

        currentDate.subtract(1, 'months');

        const currentYear = currentDate.year();
        const currentMonth = currentDate.month();


        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: `?month=${currentMonth}&year=${currentYear}`
        });

        this.setState({
            currentDate: currentDate
        })

    }

    nextMonthClicked() {
        // Update Query Param for Month and Year
        const currentDate = this.state.currentDate;

        currentDate.add(1, 'months');

        const currentYear = currentDate.year();
        const currentMonth = currentDate.month();


        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: `?month=${currentMonth}&year=${currentYear}`
        });

        this.setState({
            currentDate: currentDate
        })

    }


    render () {
        const daysInMonth = this.getMonthDays(this.state.currentDate);

        return (
            <div className = 'calendar-app'>
                        <Navigate 
                            allMonths = {moment.months()} 
                            currentDate = {this.state.currentDate} 
                            allYears = {this.getAllYears()}
                            onMonthChange = {this.monthChange}
                            onYearChange = {this.yearChange}
                            previousMonthClicked = {this.previousClicked}
                            nextMonthClicked = {this.nextClicked}
                            />
                        <Days weekDays = {this.state.weekDays}/>
                        <Month daysInMonth = {daysInMonth}/>
            </div>
        )
    }
}

export default withRouter(Calendar)