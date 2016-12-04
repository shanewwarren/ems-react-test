import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import BigCalendar from 'react-big-calendar';
import Moment from 'moment';


BigCalendar.momentLocalizer(Moment);

const SimpleHeader = React.createClass({

    render() {

        let { label } = this.props;
        label = label[0];

        return (
            <div>{ label }</div>
        );
    }
});


@observer
class Calendar extends Component {

    static propTypes = {
        date: React.PropTypes.object,
        changeDate: React.PropTypes.func
    }

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
                    day: {header: SimpleHeader},
                    week: {header: SimpleHeader},
                    month: {header: SimpleHeader}
                }}
                />
            </div>
        );
    }
};

export default Calendar;