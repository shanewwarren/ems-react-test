import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {observable} from 'mobx';

import { Link } from 'react-router';

@inject('stores') @observer
class Show extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        this._onClick = this.onClick.bind(this);
    }

    onClick() {

        const { stores, router } = this.props;
        const booking = stores.booking;

        booking.deleteBooking(booking.currentBooking.id);
        router.push('/');
    }

    componentDidMount() {

        const { params, stores } = this.props;

        stores.booking.getBooking(params.bookingId);

        this.setState({
            loaded: true
        });
    }

    render() {

        const { booking } = this.props.stores;
        const { params }= this.props;

        if (!this.state.loaded) {
            return false;
        }

        const current = booking.currentBooking;

        return (
                <div>
                    <nav className='details'>
                        <ul>
                            <li className='cancel'><Link className='header-link' to="/">&lt; Bookings</Link></li>
                            <li className='edit'><Link className='header-link' to={`/bookings/${current.id}/edit`}>Edit</Link></li>
                        </ul>
                    </nav>
                    <main className='bookingShow'>
                        <h1>{current.eventName}</h1>
                        <p className='secondary'>{current.roomName}</p>
                        <div>{current.startFormat} - {current.endFormat} ({current.durationFormat})</div>

                        <button  onClick={this._onClick} className='delete'>Delete</button>
                    </main>
                </div>
        );
    }
};

export default Show;
