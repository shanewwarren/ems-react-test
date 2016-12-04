import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {observable} from 'mobx';

import Form from './Form';

@inject('stores') @observer
class Add extends Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {

        const { stores, router }  = this.props;

        return (
            <Form booking={stores.booking} router={router}/>
        );
    }
};

export default Add;
