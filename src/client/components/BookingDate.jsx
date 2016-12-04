import React, { Component } from 'react';
import BookingItem from './BookingItem';

class BookingDate extends Component {

    render() {

        const { display, bookings, router } = this.props;

        let items = <div className='noBookings'>You have no bookings for these dates.</div>;
        if (bookings.length > 0) {

            items = bookings.map((booking, index) => {
                return (
                    <BookingItem key={`booking-${booking.id}-${index}`}
                        booking={booking}
                        router={router} />
                )
            })
        }

        return (
            <div className='bookingSection'>
                <div className='bookingDate'>{ display }</div>
                <div>
                    { items }
                </div>
            </div>
        );
    }
};

export default BookingDate;
