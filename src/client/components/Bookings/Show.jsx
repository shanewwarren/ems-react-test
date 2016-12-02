import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import Moment from 'moment';



import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import DatePicker from 'material-ui/DatePicker';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


@observer
class Show extends Component {

    static propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired
    }

    constructor() {
        super();

        this.state = {
            roomName: '',
            eventName: '',
            startTime: Moment.utc(),
            endTime: Moment.utc()
        };
    }

    render() {

        const { onClose, onSubmit } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className='dialog'>
                    <div className='dialog-header'>
                        <h2 className='dialog-title'>Book an Event</h2>
                        <i onClick={onClose}  className="close fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div className='dialog-body'>
                        <form>

                            <input onChange={(evt) => { this.setState({ eventName: evt.target.value }); }}
                                    value={this.state.eventName}
                                    type='text'
                                    placeholder='Event name' />

                            <input onChange={(evt) => { this.setState({ roomName: evt.target.value }); }}
                                    value={this.state.roomName}
                                    type='text'
                                    placeholder='Room name' />

                            <DatePicker hintText="Portrait Dialog" />

                            <input type='time'
                                    placeholder='Event name' />

                        </form>
                        <a onClick={onSubmit} className='link-button'>Create</a>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};

export default Show;