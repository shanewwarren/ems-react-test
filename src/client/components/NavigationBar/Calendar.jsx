import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

@observer
class Calendar extends Component {

    static propTypes: {
        date: React.PropTypes.string.isRequired,
        open: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func.isRequired
    }

    render() {

        const { date, open, onClick } = this.props;

        let iconClasses = classNames('icon', 'fa', {
            'fa-angle-down': !open,
            'fa-angle-up': open
        });

        return (
            <div onClick={onClick} className='calendarSelect'>
                <p className='date'>{date}</p>
                <div className='direction'><span className={iconClasses}></span></div>
            </div>
        );
    }
};

export default Calendar;