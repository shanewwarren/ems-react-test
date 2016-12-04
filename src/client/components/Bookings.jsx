import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react';
import classNames from 'classnames';
import BookingDate from './BookingDate';


@observer
class Bookings extends Component {

    constructor() {
        super();

        this.state = {
            index: -1
        };
    }

    componentDidMount() {

        const { booking } = this.props.stores;
        booking.getBookings();
    }

    componentWillReceiveProps(nextProps) {

        const { date, stores } = nextProps;
        const index = stores.booking.sections.findIndex((section) => section.isBetween(date));

        this.setState({
            index
        });
    }

    componentDidUpdate(prevProps, prevState) {

        // If the index was updated move the item into view.
        if (this.state.index >= 0 ) {

            const domNode = ReactDOM.findDOMNode(this.activeSection);
            domNode.scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        }
    }

    render() {

        const { booking } = this.props.stores;

        let items = [];

        if (booking.sections.length > 0) {
            items = booking.sections.map((section, index) => {

                const props = {
                    key: `section-${index}`,
                    display: section.display,
                    bookings: section.bookings,
                    router: this.props.router
                };

                // Set the ref for the current active
                // booking date section.
                if (this.state.index === index) {
                    props.ref = (input) => { this.activeSection = input; };
                }

                return <BookingDate {...props} />
            })
        }

        return (
            <div className='bookings'>
                { items }
            </div>
        );
    }
};




export default Bookings;
