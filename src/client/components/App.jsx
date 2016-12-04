'use strict';

import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

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

        console.log(this.props);
        return (

            <Provider stores={this.props.stores}>
                <Router history={browserHistory}>
                    <Route path="/" >
                        <IndexRoute component={Home} />
                        <Route path="/bookings" component={Add}/>
                        <Route path="/bookings/:bookingId" component={Show} />
                        <Route path="/bookings/:bookingId/edit" component={Edit} />
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            </Provider>


        );
    }
};

export default App;