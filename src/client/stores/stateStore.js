import { observable, computed, autorun, toJS } from 'mobx';
import { Section } from '../models';
import _ from 'lodash';
import Moment from 'moment';


export default class StateStore {

    @observable searchToggle = false;
    @observable calendarToggle = false;
    @observable addToggle = false;

    @observable currentMoment = Moment.utc();

    @computed get currentDate() {
        return this.currentMoment.toDate();
    }

    @computed get currentDateFormat() {
        return this.currentMoment.format('MMMM YYYY');
    }

    constructor(bookingStore, transportLayer) {

        this.transportLayer = transportLayer;
        this.bookingStore = bookingStore;

        this.toggleCalendar = this._toggleCalendar.bind(this);
        this.toggleSearch = this._toggleSearch.bind(this);
        this.toggleAdd = this._toggleAdd.bind(this);

        this.updateSearch = this._updateSearch.bind(this);
        this.setDate = this._setDate.bind(this);
        this.setNow = this._setNow.bind(this);
    }

    _setDate(date) {

        this.currentMoment = Moment.utc(date);
    }

    _setNow() {

        this._setDate(Moment());
    }

    _toggleSearch() {

        this.searchToggle = !this.searchToggle;

        if (this.calendarToggle) {
            this.calendarToggle = false;
        }

        if (!this.searchToggle) {
            this.bookingStore.filter = '';
        }
    }

    _toggleCalendar() {

        this.calendarToggle = !this.calendarToggle;
    }

    _toggleAdd() {

        this.addToggle = !this.addToggle;
    }


    _updateSearch(term) {

        this.bookingStore.filter = term;
    }
}