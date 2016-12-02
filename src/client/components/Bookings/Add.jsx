import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {observable} from 'mobx';

import Form from './Form';

@inject('stores') @observer
class Add extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { stores }  = this.props;

        return (
            <Form onSubmit={stores.bookings.createBooking}/>
        );
    }
};

export default Add;
