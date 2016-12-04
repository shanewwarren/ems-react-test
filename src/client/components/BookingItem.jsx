import React, { Component } from 'react';
import {observable} from 'mobx';
import { browserHistory } from 'react-router';

class BookingItem extends Component {

    constructor() {
        super();


        this._handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        const { booking } = this.props;

        browserHistory.push(`/bookings/${booking.id}`);
    }


    render() {

        const { booking } = this.props;
        return (
            <div className='booking'  onTouchTap={this._handleClick} onClick={this._handleClick}>
                <table>
                    <tbody>
                        <tr>
                            <td>{booking.startFormat}</td>
                            <td>{booking.eventName}</td>
                        </tr>
                        <tr>
                            <td>{booking.endFormat}</td>
                            <td>{booking.roomName}</td>
                        </tr>
                        <tr>
                            <td>{booking.durationFormat}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};

export default BookingItem;
