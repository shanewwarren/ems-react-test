'use strict';

import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';


class Root extends Component {


    constructor() {
        super();
    }

    render() {

        return (
            {this.props.children}
        );
    }
};

export default Root;