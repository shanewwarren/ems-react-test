import BookingStore from './bookingStore';
import StateStore from './stateStore';
import Transport from '../transport';

export function getStores() {

    const stores = {};

    stores.booking = new BookingStore(Transport);
    stores.state = new StateStore(stores.booking, Transport);

    return stores;
}