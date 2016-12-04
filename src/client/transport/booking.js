// Load modules
import Store from 'store';

// Declare internals
const internals = {};

internals.key = 'booking';
internals.getKey = function (id) {

    return `${internals.key}:${id}`;
};

export function getBookings() {

    const items = [];

    const regex = new RegExp(`${internals.key}:[\\w|\\d]+`)
    Store.forEach((key, val) => {

        if (key.match(regex)) {
            items.push(val);
        }
    });

    return items;
};

export function parseId(id) {

    let actualId = parseInt(id);
    if (!Number.isInteger(actualId)) {
        actualId = id;
    }

    return actualId;
}

export function getBooking(id) {


    let actualId = parseId(id);

    const key = internals.getKey(actualId);
    return Store.get(key);

};

export function updateBooking(item) {

    item.id = parseId(item.id);


    const key = internals.getKey(item.id);
    return Store.set(key, item);

};

export function deleteBooking(id) {

    let actualId = parseId(id);

    const key = internals.getKey(actualId);
    return Store.remove(key);

};