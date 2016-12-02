'use strict';

import {observable, computed } from 'mobx';
import Moment from 'moment';
require("moment-duration-format");

export default class Booking {

    id = null;

    @observable eventName = null;
    @observable roomName = null;
    @observable start = null;
    @observable end = null;

    constructor(id = null) {
        this.id = id;
    }

    updateFromJson(json) {

        this.eventName = json.eventName;
        this.roomName = json.roomName;

        this.start = Moment.utc(json.start);
        console.log(this.startFormat);
        this.end = Moment.utc(json.end);

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

};