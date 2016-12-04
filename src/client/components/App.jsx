'use strict';

import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { isProduction } from '../utils/environment';
import { Router, Route, Link, useRouterHistory, browserHistory, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import Home from './Home';
import NoMatch from './NoMatch';
import Add from './Bookings/Add';
import Edit from './Bookings/Edit';
import Show from './Bookings/Show';

// Specify a basename when in production
// so we can host it on Github Pages.
let history = useRouterHistory(createHistory)({
    basename: (isProduction() ? '/ems-react-test' : '/')
});

class App extends Component {

    render() {
        return (
            <Provider stores={this.props.stores}>
                <Router history={history}>
                    <Route path="/"  component={Home} />
                    <Route path="/bookings" component={Add} />
                    <Route path="/bookings/:bookingId" component={Show} />
                    <Route path="/bookings/:bookingId/edit" component={Edit} />
                    <Route path="*" component={NoMatch}/>
                </Router>
            </Provider>
        );
    }
};

export default App;