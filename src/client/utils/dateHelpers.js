import Moment from 'moment';

export function getBetweenDates(momentOne, momentTwo) {

    const copyOne = Moment.utc(momentOne);
    const copyTwo = Moment.utc(momentTwo);

    copyOne.add(1, 'days');

    if (copyOne.startOf('day').isSame(copyTwo.startOf('day')) ||
        copyOne.startOf('day').isAfter(copyTwo.startOf('day'))) {
        return null;
    }

    const daysInBetween = copyTwo.diff(copyOne, 'days') - 1;
    return {
        start: Moment.utc(copyOne),
        end: Moment.utc(copyOne.add(daysInBetween, 'days'))
    };
};

export function startOfDay(moment) {

    return Moment.utc(moment).startOf('day').format();
}

export function formatDay(date) {
    return Moment.utc(date).format('ddd MMM D');
}

export function formatTime(time) {
    return Moment.utc(time).format('h:mm A');
}