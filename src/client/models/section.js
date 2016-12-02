'use strict';

import {observable} from 'mobx';
import Moment from 'moment';

export default class Section {

    bookings = [];
    start = null;
    end = null;

    constructor(start, end) {

        if (start) {
            this.start = Moment.utc(start);
        }

        if (end) {
            this.end = Moment.utc(end);
        }
    }

    isBetween(date) {

        return (
            date.startOf('day').isSameOrAfter(this.start.startOf('day')) &&
            date.startOf('day').isSameOrBefore(this.end.startOf('day'))
        );
    }

    get display() {

        const startFmt = this.start.format('ddd MMM D');
        const endFmt = this.end.format('ddd MMM D');
        let date = `${startFmt} - ${endFmt}`;
        if (startFmt === endFmt) {
            date = startFmt;
        }

        return date;
    }
};