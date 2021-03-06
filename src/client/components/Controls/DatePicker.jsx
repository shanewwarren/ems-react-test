import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx';
import classNames from 'classnames';
import MuiTheme from './MuiTheme';
import Moment from 'moment';
const MuiDatePicker = require('material-ui/DatePicker').default;

@observer
class DatePicker extends Component {

    static propTypes: {
        name: PropTypes.string.isRequired,
        errorMessage: PropTypes.string,
        placeholder: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.object,
        className: PropTypes.string,
        formatDate: PropTypes.func.isRequired
    }

    constructor() {
        super();

        this._onChange = this.onChange.bind(this);
    }

    onChange(event, data) {

        let date = data;
        if (event && event.target && event.target.value) {
            // mobile fallback
            date = Moment(event.target.value, 'YYYY-MM-DD').toDate();
        }

        if (this.props.onChange) {
            this.props.onChange(date);
        }
    }

    renderError(error) {
        if (!error) {
            return false;
        }

        return (
            <div className='error'>
                {error}
            </div>
        );
    }

    render() {

        const { readOnly, placeholder, value, formatDate,
                errorMessage, name, className } = this.props;


        const inputStyles = classNames('datepicker', className);


        // TODO figure out how to apply it to the date picker.
        const inputClass = classNames({ 'error': errorMessage });

        const label = name.replace(/\s/g, '_').toLowerCase();

        const inputStyle = {
            padding: '12px',
            fontSize: '1em',
            outline: '0',
            border: '1px solid #ddd'
        };

        const textFieldStyle = {
            width: '100%'
        }

        const hintStyle = {
            bottom: 0,
            padding: '12px',
            color: 'darkgray'
        };

        const dialogContainerStyle = {
            top: '-10%'
        }


        let mobileValue = '';

        if (value instanceof Date) {
            mobileValue = Moment(value).format('YYYY-MM-DD');
        }

        return (

            <MuiTheme>
                <div>
                    <label htmlFor={label}>{placeholder}</label>
                    <MuiDatePicker textFieldStyle={textFieldStyle}
                                className='datepicker'
                                dialogContainerStyle={dialogContainerStyle}
                                hintStyle={hintStyle}
                                formatDate={formatDate}
                                inputStyle={inputStyle}
                                underlineShow={false}
                                id={label}
                                value={value}
                                onChange={this._onChange}
                                hintText={placeholder} />

                    <div className='mobile'>
                        <input type='date'
                            placeholder={placeholder}
                            value={mobileValue}
                            onChange={this._onChange}
                            min="0001-01-01"
                            max="9999-12-31" />
                    </div>

                    { this.renderError(errorMessage) }
                </div>
            </MuiTheme>
        );
    }
};

export default DatePicker;