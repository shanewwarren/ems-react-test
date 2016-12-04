import React, { Component } from 'react';
import { connect } from 'mobx-connect';
import {observable} from 'mobx';

import classNames from 'classnames';
import Moment from 'moment';

import { Link } from 'react-router';
import { formatDay, formatTime, combineDateAndTime } from '../../utils/dateHelpers';

import TextField from '../Controls/TextField';
import DatePicker from '../Controls/DatePicker';
import TimePicker from '../Controls/TimePicker';
import Flash from '../Controls/Flash';
import Joi from 'joi-browser';
import { browserHistory } from 'react-router';

const FormHelper = require('../../utils/Form').default;

@connect
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
                startDate: Joi.date().required(),
                startTime: Joi.date().required(),
                endDate: Joi.date().required(),
                endTime: Joi.date().required()
            },
            defaults: {
                startDate: {},
                startTime: {},
                endDate: {},
                endTime: {}
            },
            submitAction: this.onSubmit.bind(this)
        };

        if (this.props.id) {
            options.loadAction = this.loadState.bind(this);
            options.mapState = this.mapState.bind(this);
        } else {
            options.loadAction = () => Promise.resolve(null);
            options.mapState = () => {};
        }

        this.form.initialize(options);
        this.form.load();
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

        if (!this.form.state.valid) {
            return
        }

        const payload = {
            roomName: form.roomName,
            eventName: form.eventName
        };

        payload.start = combineDateAndTime(form.startDate, form.startTime);
        payload.end = combineDateAndTime(form.endDate, form.endTime);

        const promise = new Promise((resolve, reject) => {

            try {
                if (id) booking.updateBooking(id, payload);
                else booking.createBooking(payload);

                return resolve();
            }
            catch (err) {

                return reject(err);
            }
        });

        return promise.then(() => {

            const link = this.getCancelLink();
            return browserHistory.push(link);
        })

    }

    getCancelLink() {

        const { id } = this.props;

        return id ? `/bookings/${id}/` : '/';
    }

    render() {

        const { id } = this.props;

        const submitClasses = classNames('done', {
            'disabled': !this.form.state.valid
        });

        let errorFlash = null;
        if (this.form.state.formError) {
            errorFlash =  <Flash status="error" message={this.form.state.formError} />;
        }

        return (
                <div>
                    <nav className='details'>
                        <ul>
                            <li className='cancel'><Link className='header-link' to={this.getCancelLink()}>Cancel</Link></li>
                            <li className={submitClasses} onClick={this.form.submit}><a>Done</a></li>
                            <li className='title'>{ id ? 'Update Booking' : 'Create Booking'}</li>
                        </ul>
                    </nav>
                    <main className='bookingForm'>
                        <form className='column'>
                            {errorFlash}
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