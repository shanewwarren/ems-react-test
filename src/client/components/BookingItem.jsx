import React, { Component } from 'react';

class BookingItem extends Component {

    constructor(props, context) {
        super(props, context);

        this._handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        const { booking, router } = this.props;

        router.push(`/bookings/${booking.id}/`);
    }

    render() {

        const { booking } = this.props;
        return (
            <div className='booking'
                 onTouchTap={this._handleClick}
                 onClick={this._handleClick}>
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
