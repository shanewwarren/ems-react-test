import { observable, computed } from 'mobx';
import Moment from 'moment';
import _ from 'lodash';
import { flow, filter, groupBy, toPairs, concat, sortBy } from 'lodash/fp';
const map = require('lodash/fp/map').convert({ 'cap': false });

import EscapeStringRegexp from 'escape-string-regexp';
import { getBetweenDates, startOfDay } from '../utils/dateHelpers';
import { Booking, Section } from '../models';

// Load the sample bookings for default
const defaultBookings = require('../../../prototype/bookings.json');

export default class BookingStore {

    constructor(transportLayer) {

        this.transportLayer = transportLayer;
    }

    @observable currentBooking = null;
    @observable bookings = [];
    @observable filter = null;

    // Computed value that is recalculated anytime the bookings
    // array changes.
    @computed get sections() {
        let sections = flow([

            // Filter the bookings.
            filter(booking => this._filterBooking(booking, this.filter)),

            // Group bookings which happen on the same day.
            groupBy(booking => startOfDay(booking.start)),
            toPairs,

            // Now transform into a section.
            map((pair) => {
                const section = new Section(pair[0], pair[0]);
                section.bookings = pair[1];
                return section;
            })

        ])(this.bookings);

        // Create timespans with no bookings.
        let emptySections = [];

        if (!this.filter) {

            emptySections = flow([
                // Generate a section for dates between bookings.
                map(this._generateEmptySection),
                filter((section) => section !== null)
            ])(sections);
        }

        return flow([
            concat(emptySections),
            sortBy((section) => section.start)
        ])(sections);

    }

    getBooking(id) {

        const json = this.transportLayer.getBooking(id);
        this.currentBooking = new Booking(json.id);
        this.currentBooking.updateFromJson(json);
    }

    createBooking(payload) {


        const booking = new Booking();
        booking.updateFromJson(payload);

        const error = booking.isValid();
        if (error) {
            throw new Error(error);
        }

        this.transportLayer.updateBooking(booking);
    }

    updateBooking(id, payload) {

        payload.id = id;
        const json = this.transportLayer.updateBooking(payload);
        this.updateFromServer([json]);
    }


    deleteBooking(id) {

        this.transportLayer.deleteBooking(id);

        const index = _.findIndex(this.bookings, { id });
        if (index > -1) {
            this.bookings.splice(index, 1);
        }
    }

    getBookings() {

        let bookings = this.transportLayer.getBookings();
        if (bookings.length === 0) {

            console.log('Bootstrapping data...');

            // Boostrap with sample data.
            bookings = defaultBookings.bookings;

            // Save to local storage
            bookings.forEach(this.transportLayer.updateBooking);
        }
        else {
            console.log ('Data loaded from local storage.');
        }

        this.updateFromServer(bookings);
    }

    updateFromServer(jsonItems) {

        jsonItems.forEach((json) => {

            let found = _.find(this.bookings, { id: json.id });

            if (!found) {
                found = new Booking(json.id);
                found.updateFromJson(json);
                this.bookings.push(found);
            }
            else {
                found.updateFromJson(json);
            }
        });
    }

   _generateEmptySection(section, index, sections) {

        if (!sections[index + 1]) {
            return null;
        }

        const nextSection = sections[index + 1];
        const between = getBetweenDates(section.start, nextSection.start);
        if (!between) {
            return null;
        }

        return new Section(between.start, between.end);
    }

    _filterBooking(booking, filter) {


        if (!filter) {
            return true;
        }

        const regex = new RegExp(EscapeStringRegexp(filter), 'i');

        return (
            (booking.eventName && booking.eventName.match(regex)) ||
            (booking.roomName && booking.roomName.match(regex))
        );
    }
}