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

        const index = stores.booking.sections.findIndex((section) => {
            return section.isBetween(date)
        });

        this.setState({
            index
        });
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.index >= 0 && (this.state.index !== prevState.index)) {

            const domNode = ReactDOM.findDOMNode(this.activeSection);
            domNode.scrollIntoView({
                block: "end",
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
                    bookings: section.bookings
                };

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
