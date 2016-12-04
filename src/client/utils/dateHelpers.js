import Moment from 'moment';

export function getBetweenDates(momentOne, momentTwo) {

    const copyOne = Moment(momentOne);
    const copyTwo = Moment(momentTwo);

    copyOne.add(1, 'days');

    const startOne = Moment(copyOne.startOf('day'));
    const startTwo = Moment(copyTwo.startOf('day'));

    if (startOne.isSame(startTwo) ||
        startOne.isAfter(startTwo)) {
        return null;
    }

    const daysInBetween = copyTwo.diff(copyOne, 'days') - 1;
    return {
        start: Moment(copyOne),
        end: Moment(copyOne.add(daysInBetween, 'days'))
    };
};

export function startOfDay(moment) {

    return Moment(moment).startOf('day').format();
}

export function formatDay(date) {
    return Moment(date).format('ddd MMM D');
}

export function formatTime(time) {
    return Moment(time).format('h:mm A');
}

export function combineDateAndTime(date, time) {

    const dateCopy = Moment(date);
    const timeCopy = Moment(time).startOf('minute');

    const dateFormat = dateCopy.format('MM-DD-YYYY');
    const timeFormat = timeCopy.format('HH:mm:ss');

    return Moment(`${dateFormat}T${timeFormat}`, 'MM-DD-YYYYTHH:mm:ss');
}