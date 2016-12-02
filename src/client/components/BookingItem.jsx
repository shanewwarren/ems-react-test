import React, { Component } from 'react';
import {observable} from 'mobx';

class BookingItem extends Component {

    static prop

    render() {

        const { booking } = this.props;

        return (
            <div className='booking'>
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
