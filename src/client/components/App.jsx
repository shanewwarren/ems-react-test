'use strict';

import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// 1. import a few components
import { BrowserRouter, Match, Miss, Link } from 'react-router'

import Home from './Home';
import NoMatch from './NoMatch';
import Add from './Bookings/Add';
import Edit from './Bookings/Edit';
import Show from './Bookings/Show';

// const Topics = ({ pathname, pattern }) => (
//   // 5. Components rendered by a `Match` get some routing-specific
//   //    props, like the portion of the parent `pattern` that was
//   //    matched against the current `location.pathname`, in this case
//   //    `/topics`
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       {/* 6. Use the parent's matched pathname to link relatively */}
//       <li><Link to={`${pathname}/rendering`}>Rendering with React</Link></li>
//       <li><Link to={`${pathname}/components`}>Components</Link></li>
//       <li><Link to={`${pathname}/props-v-state`}>Props v. State</Link></li>
//     </ul>

//     {/* 7. Render more `Match` components to get nesting naturally
//            within the render lifecycle. Use the parent's matched
//            pathname to nest the url.
//     */}
//     <Match pattern={`${pathname}/:topicId`} component={Topic}/>

//     {/* 8. use the `render` prop for convenient inline rendering */}
//     <Match pattern={pathname} exactly render={() => (
//       <h3>Please select a topic</h3>
//     )}/>
//   </div>
// )

// const Topic = ({ params }) => (
//   // 9. the dynamic segments of a `pattern` (in this case `:topicId`)
//   //    are parsed and sent to the component from `Match`.
//   <div>
//     <h3>{params.topicId}</h3>
//   </div>
// )

class App extends Component {


    constructor() {
        super();
    }

    render() {

        console.log(this.props);
        return (

            <BrowserRouter>

                <Provider stores={this.props.stores}>
                    <div className='wrapper'>

                        <Match exactly pattern="/" component={Home} />
                        <Match exactly pattern="/bookings" component={Add} />
                        <Match pattern="/bookings/:bookingId/edit" component={Edit} />
                        {/* If none of those match, then a sibling `Miss` will render. */}
                        <Miss component={NoMatch}/>

                    </div>
                </Provider>

            </BrowserRouter>
        );
    }
};

export default App;