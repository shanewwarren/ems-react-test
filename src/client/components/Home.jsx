import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import NavigationBar from './NavigationBar/NavigationBar';
import Calendar from './Controls/Calendar';
import Bookings from './Bookings';


@inject('stores') @observer
class Home extends Component {

    render() {

        const { stores, router } = this.props;
        const { state } = stores;

        let calendar = null;
        if (state.calendarToggle) {
            calendar = (
                <Calendar date={state.currentDate}
                          changeDate={state.setDate} />
            );
        }


        return (
            <div className='container'>
                <NavigationBar stores={stores} />
                <div className='content'>
                    { calendar }
                    <Bookings   router={router}
                                date={state.currentMoment}
                                stores={stores} />

                    <a onClick={state.setNow} className='link-button'>Now</a>
                </div>
            </div>
        );
    }
};

export default Home;