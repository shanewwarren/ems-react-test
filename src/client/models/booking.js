'use strict';

import {observable, computed } from 'mobx';
import Moment from 'moment';
require("moment-duration-format");
import Uuid from 'node-uuid';

export default class Booking {

    id = null;

    @observable eventName = null;
    @observable roomName = null;
    @observable start = null;
    @observable end = null;

    constructor(id = Uuid.v4()) {
        this.id = id;
    }

    isSame(id) {

        const int = parseInt(id);
        if (Number.isInteger(int)) {
            return int === this.id;
        }

        return id === this.id;
    }

    updateFromJson(json) {

        this.eventName = json.eventName;
        this.roomName = json.roomName;

        this.start = Moment(json.start);
        this.end = Moment(json.end);

        this.duration = Moment.duration(this.end.diff(this.start));
    }

    @computed get startFormat () {
        return this.start.format('h:mm A');
    }

    @computed get endFormat () {
        return this.end.format('h:mm A');
    }

    get durationFormat() {

        let duration = this.duration.format("h[h], m[m]");
        return duration.replace(', 0m', '');
    }

    isValid() {

        let error = null;
        if (this.start.isSameOrAfter(this.end)) {
            error = 'The booking start date/time must be earlier than the end date/time';
        }

        return error;
    }

};