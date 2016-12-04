import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx';
import classNames from 'classnames';
import MuiTheme from './MuiTheme';
import Moment from 'moment';
const MuiTimePicker = require('material-ui/TimePicker').default;

@observer
class TimePicker extends Component {

    static propTypes: {
        name: PropTypes.string.isRequired,
        errorMessage: PropTypes.string,
        placeholder: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.object,
        className: PropTypes.string,
    }

    constructor() {
        super();

        this._onChange = this.onChange.bind(this);
    }

    onChange(event, data) {


        let time = data;
        if (event && event.target && event.target.value) {
            // mobile fallback
            time = Moment(event.target.value, 'HH:mm').toDate();
        }

        if (this.props.onChange) {
            this.props.onChange(time);
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

        const { readOnly, placeholder, value, errorMessage, name, className } = this.props;

        const inputStyles = classNames('timepicker', className);

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

        let mobileValue = Moment(value, 'HH:mm').format('HH:mm');

        return (

            <MuiTheme>
                <div>
                    <label htmlFor={label}>{placeholder}</label>
                    <MuiTimePicker
                        className='timepicker'
                        textFieldStyle={textFieldStyle}
                        hintStyle={hintStyle}
                        inputStyle={inputStyle}
                        underlineShow={false}
                        name={label}
                        format="ampm"
                        hintText={placeholder}
                        value={value}
                        onChange={this._onChange} />


                    <div className='mobile'>
                        <input type='time'
                            placeholder={placeholder}
                            value={mobileValue}
                            onChange={this._onChange}  />
                    </div>


                    { this.renderError(errorMessage) }
                </div>
            </MuiTheme>
        );
    }
};

export default TimePicker;