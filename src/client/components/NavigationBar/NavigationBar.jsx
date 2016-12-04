import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MonthSelect from './MonthSelect';
import SearchBar from './SearchBar';
import { Link } from 'react-router';

@observer
class NavigationBar extends Component {

    constructor() {
        super();
    }

    render() {

        const { state, booking } = this.props.stores;

        let navContent = (
            <ul>
                <li className='menu'><span className='icon fa fa-bars'></span></li>
                <li className='search' onClick={state.toggleSearch}><span className='icon fa fa-search'></span></li>
                <li className='add'><Link to="/bookings/"><span className='icon fa fa-plus'></span></Link></li>
                <li className='calendar'>
                    <MonthSelect onClick={state.toggleCalendar}
                              date={state.currentDateFormat}
                              open={state.calendarToggle} />
                </li>
            </ul>
        );

        if (state.searchToggle) {
           navContent = (
              <SearchBar term={booking.filter}
                         update={state.updateSearch}
                         close={state.toggleSearch} />
           );
        }

        return (
            <nav>
                { navContent }
            </nav>
        );
    }

};

export default NavigationBar;