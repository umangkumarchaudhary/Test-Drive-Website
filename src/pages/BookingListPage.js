import React, { useState, useEffect } from 'react';
import './BookingList.css'; // Import CSS file for styling

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    useEffect(() => {
        const loadBookings = () => {
            const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
            setBookings(savedBookings);
            filterBookings(savedBookings);
        };

        loadBookings();
    }, []);

    const filterBookings = (bookings) => {
        const now = new Date();
        const futureAndOngoingBookings = bookings.filter((booking) => {
            const bookingStart = new Date(`${booking.date}T${booking.startTime}`);
            const bookingEnd = new Date(`${booking.date}T${booking.endTime}`);
            // Show bookings where the start time is in the future or the end time is in the future
            return bookingStart >= now || (bookingStart <= now && bookingEnd >= now);
        });
        setFilteredBookings(futureAndOngoingBookings);
    };

    return (
        <div className="booking-list-container">
            <h2>Upcoming and Ongoing Test Drives</h2>
            <ul className="booking-list">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                        <li key={index} className="booking-item">
                            <div className="booking-details">
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Start Time:</strong> {booking.startTime}</p>
                                <p><strong>End Time:</strong> {booking.endTime}</p>
                                <p><strong>Car Model:</strong> {booking.carModel}</p>
                                <p><strong>Username:</strong> {booking.username}</p>
                                <p><strong>Sales Consultant:</strong> {booking.salesConsultant}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-bookings-message">No upcoming or ongoing test drives.</p>
                )}
            </ul>
        </div>
    );
};

export default BookingList;
