'use strict';

import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { isProduction } from '../utils/environment';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { Router, Route, Link, useRouterHistory, browserHistory, IndexRoute } from 'react-router';
import { createHistory } from 'history';


let basename = '/';
if (isProduction()) {
    basename = '/ems-react-test';
}

let history = useRouterHistory(createHistory)({
    basename: basename
});

import Home from './Home';
import NoMatch from './NoMatch';
import Add from './Bookings/Add';
import Edit from './Bookings/Edit';
import Show from './Bookings/Show';

class App extends Component {


    constructor() {
        super();
    }

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
// <Route path="/" >
//  <IndexRoute component={Home} />
//       </Route>