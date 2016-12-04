import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import NavigationBar from './NavigationBar/NavigationBar';
import Calendar from './Calendar';
import Bookings from './Bookings';
import Portal from './Portal';
// import Add from './Add';


@inject('stores') @observer
class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { stores } = this.props;
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
                    <Bookings date={state.currentMoment}
                              stores={stores} />

                    <a onClick={state.setNow} className='link-button'>Now</a>
                </div>
            </div>
        );
    }
};

export default Home;