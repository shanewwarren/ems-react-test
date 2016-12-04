'use strict';

import { observable, toJS } from 'mobx';
import Inflector from 'inflected';
import Joi from 'joi-browser';

const internals = {

    schema: {
        mapState: Joi.func(),
        loadAction: Joi.func(),
        submitAction: Joi.func(),
        validations: Joi.object(),
        values: Joi.object(),
        defaults: Joi.object(),
        placeholders: Joi.object()
    },

    defaults: {
        loadAction: null,
        values: {},
        defaults: {},
        placeholders: {}
    }

};

class Form {

    constructor() {

        this.error = null;
        this.form = null;
        this.state = null;

        this._validation = null;
        this._placeholders = null;
        this._names = null;
        this._changeEvents = null;
        this._leaveEvents = null;

        this.submit = this._submit.bind(this);
        this.load = this._load.bind(this);
    }

    valid() {

        const result = Joi.validate(this.form, Joi.object().keys(this._validation));
        if (!result.error) {
            this.state.valid = true;
        }
        else {
            this.state.valid = false;
        }
    }

    onChange(key, value) {

        this.form[key] = value;
        this.valid();
    }

    onLeave(key) {

        const result = Joi.validate(this.form[key], this._validation[key]);
        if (result.error) {
            const regex = /(\"[^\"]*\")/;
            const propertyName = Inflector.humanize(Inflector.underscore(key));
            const errorMessage = result.error.message;

            this.error[key] = errorMessage.replace(regex, propertyName);
        }
        else {
            this.error[key] = null;
        }
    }

    fieldProps(key) {

        return {
            errorMessage: this.error[key],
            value: this.form[key],
            placeholder: this._placeholders[key],
            name: this._names[key],
            onChange: this._changeEvents[key],
            onBlur: this._leaveEvents[key]
        }
    }

    _submit(evt) {

        if (!this.state.valid) {
            return;
        }

        if (evt) {
            evt.preventDefault();
        }

        this.state.submitting = true;

        return this._submitAction(toJS(this.form))
                   .then(() => {
                       this.state.submitting = false;
                   })
                   .catch((err) => {
                       this.state.submitting = false;
                       this.state.formError = err.message;
                   });
    }

    _load() {

        const success = this._mapState(this.form);
        if (success) {
            this.state.loading = false;
            this.valid();
            return Promise.resolve(true);
        }

        return this._loadAction(this.form)
                    .then(() => {
                        this._mapState(this.form);
                        this.state.loading = false;
                        this.valid();
                        return true;
                    })
                    .catch((err) => {
                        this.state.loading = false;
                        return false;
                    });
    }



    initialize(options) {

        const config = Object.assign({}, internals.defaults, options);
        const valid = Joi.validate(config, internals.schema);

        if (valid.error) {
            throw new Error(valid.error);
        }

        const keys = Object.keys(config.validations);

        const error = {};
        const form = {};
        const placeholders = {};
        const names = {};
        const changeEvents = {};
        const leaveEvents = {};

        for(const key of keys) {
            error[key] = null;

            if (config.values[key]) {
                form[key] = config.values[key];
            }
            else if (config.defaults[key]) {
                form[key] = config.defaults[key];
            }
            else {
                form[key] = '';
            }

            placeholders[key] = config.placeholders[key] ? config.placeholders[key] : Inflector.titleize(key);
            names[key] = Inflector.tableize(key);

            changeEvents[key] = this.onChange.bind(this, key);
            leaveEvents[key] = this.onLeave.bind(this, key);
        }

        this._submitAction = config.submitAction;
        this._loadAction = config.loadAction;
        this._mapState = config.mapState

        this._validation = config.validations;
        this._placeholders = placeholders;
        this._names = names;
        this._changeEvents = changeEvents;
        this._leaveEvents = leaveEvents;

        this.form = observable(form);
        this.error = observable(error);
        this.state = observable({
            loading: this._loadAction ? true : false,
            valid: false,
            submitting: false,
            formError: ''
        });
    }


}

export default Form;