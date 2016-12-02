import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx';
import classNames from 'classnames';


@observer
class TextField extends Component {

    static propTypes: {
        name: PropTypes.string.isRequired,
        errorMessage: PropTypes.string,
        placeholder: PropTypes.string.isRequired,
        type: PropTypes.string,
        focusOnLoad: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.string,
        className: PropTypes.string
    }

    constructor() {
        super();

        this._onChange = this.onChange.bind(this);
        this._onBlur = this.onBlur.bind(this);
    }

    onChange(event) {

        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    onBlur(event) {

        if (this.props.onBlur) {
            this.props.onBlur(event.target.value)
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

        const { readOnly, placeholder, value, errorMessage, name, className, inputType } = this.props;

        const inputStyles = classNames('input', className);
        const inputClass = classNames({ 'error': errorMessage });
        const inputLabel = name.replace(/\s/g, '_').toLowerCase();

        return (
            <div className={inputStyles}>

                <label htmlFor={inputLabel}>{placeholder}</label>
                <input ref="textField"
                    onChange={this._onChange}
                    name={inputLabel}
                    className={inputClass}
                    onBlur={this._onBlur}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly} />

                { this.renderError(errorMessage) }
            </div>
        );
    }
};

export default TextField;