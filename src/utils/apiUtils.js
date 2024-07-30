export const getBookings = () => {
    return JSON.parse(localStorage.getItem('bookings')) || [];
};

export const saveBooking = (booking) => {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
};
