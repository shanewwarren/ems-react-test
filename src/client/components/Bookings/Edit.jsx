import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {observable} from 'mobx';

import Form from './Form';

@inject('stores') @observer
class Edit extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { params, stores, router } = this.props;

        return (
            <Form id={params.bookingId}
                  booking={stores.booking}
                  router={router} />
        );
    }
};

export default Edit;
