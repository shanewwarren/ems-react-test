import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx';

import classNames from 'classnames';
import Moment from 'moment';

import { Link } from 'react-router';
import { formatDay, formatTime } from '../../utils/dateHelpers';

import TextField from '../Controls/TextField';
import DatePicker from '../Controls/DatePicker';
import TimePicker from '../Controls/TimePicker';
import Joi from 'joi-browser';

const FormHelper = require('../../utils/Form').default;

@observer
class Form extends Component {

    static propTypes: {
        id: React.PropTypes.number,
        booking: React.PropTypes.object
    }

    constructor(props) {
        super(props);

        this.form = new FormHelper();

        const options = {
            validations: {
                roomName: Joi.string().required(),
                eventName: Joi.string().required(),
                startDate: Joi.object().required(),
                startTime: Joi.object().required(),
                endDate: Joi.object().required(),
                endTime: Joi.object().required()
            },
            defaults: {
                startDate: {},
                startTime: {},
                endDate: {},
                endTime: {}
            },
            submitAction: this.onSubmit.bind(this)
        };

        if (props.id) {
            options.loadAction = this.loadState.bind(this);
            options.mapState = this.mapState.bind(this);
        } else {
            options.loadAction = () => Promise.resolve(null);
            options.mapState = () => {};
        }

        this.form.initialize(options);
        this.form.load()
    }



    loadState() {

        const { booking, id } = this.props;

        booking.getBooking(id);

        return Promise.resolve(null);
    }

    mapState(form) {

        const { currentBooking } = this.props.booking;
        if (currentBooking) {

            form.roomName = currentBooking.roomName;
            form.eventName = currentBooking.eventName;
            form.startDate = currentBooking.start.toDate();
            form.startTime = currentBooking.start.toDate();
            form.endDate = currentBooking.end.toDate();
            form.endTime = currentBooking.end.toDate();
            return true;
        }

        return false;
    }

    onSubmit(form) {

        const { booking, id } = this.props;

        if (this.form.valid) {

            if (id) {
                booking.updateBooking(id, form);
            } else {
                booking.createBooking(form);
            }
        }
    }

    render() {

        const { onClose, onSubmit } = this.props;

        const submitClasses = classNames('done', {
            'disabled': !this.form.state.valid
        });

        return (
                <div>
                    <nav className='details'>
                        <ul>
                            <li className='cancel'><Link className='header-link' to="/">Cancel</Link></li>
                            <li className={submitClasses} onClick={this.form.submit}><a>Done</a></li>
                            <li className='title'>Create Booking</li>
                        </ul>
                    </nav>
                    <main className='bookingForm'>
                        <form className='column'>

                            <div className='rowSpace'>
                                <TextField  {...this.form.fieldProps('eventName')}
                                        inputType='text'
                                        focusOnLoad={true} />
                            </div>

                            <div className='rowSpace'>
                                <TextField  {...this.form.fieldProps('roomName')}
                                        inputType='text' />
                              </div>


                            <div className='row rowSpace'>
                                <div className='column dateField'>
                                    <DatePicker  {...this.form.fieldProps('startDate')}  />
                                </div>
                                <div className='column timeField'>
                                    <TimePicker {...this.form.fieldProps('startTime')} />
                                </div>
                            </div>

                            <div className='row rowSpace'>
                                <div className='column dateField'>
                                    <DatePicker  {...this.form.fieldProps('endDate')}  />
                                </div>
                                <div className='column timeField'>
                                    <TimePicker {...this.form.fieldProps('endTime')} />
                                </div>
                            </div>

                        </form>

                    </main>
                </div>
        );
    }
};

export default Form;