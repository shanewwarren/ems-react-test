import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import BigCalendar from 'react-big-calendar';
import Moment from 'moment';


BigCalendar.momentLocalizer(Moment);



let MyCustomHeader = React.createClass({
  render(){

    let { label } = this.props
    label = label[0];

    return (
        <div>{ label }</div>
    )
  }
})


@observer
class Calendar extends Component {

    constructor() {
        super();

        this._onNavigate = this.onNavigate.bind(this);
    }

    onNavigate(newDate) {

        const { changeDate } = this.props;

        changeDate(newDate);
    }

    render() {

        const { date } = this.props;

        return (
            <div className='calendarSelect'>
                <BigCalendar
                onNavigate={this._onNavigate}
                events={[]}
                timeslots={10}
                date={date}
                startAccessor='startDate'
                endAccessor='endDate'
                views={{ month: true }}
                toolbar={false}
                weekdayFormat={'dd'}
                components={{
                    day: {header: MyCustomHeader},
                    week: {header: MyCustomHeader},
                    month: {header: MyCustomHeader}
                }}
                />
            </div>
        );
    }
};

export default Calendar;