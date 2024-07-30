import React, { useState, useEffect } from 'react';
import './CompleteBookingList.css'; // Import CSS file

const CompleteBookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const loadBookings = () => {
            const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
            // Sort bookings by date and startTime in descending order
            const sortedBookings = savedBookings.sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.startTime}`);
                const dateB = new Date(`${b.date}T${b.startTime}`);
                return dateB - dateA;
            });
            setBookings(sortedBookings);
        };

        loadBookings();
    }, []);

    return (
        <div className="complete-booking-list">
            <h2>All Test Drives</h2>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Car Model</th>
                        <th>Username</th>
                        <th>Sales Consultant</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.date}</td>
                            <td>{booking.startTime}</td>
                            <td>{booking.endTime}</td>
                            <td>{booking.carModel}</td>
                            <td>{booking.username}</td>
                            <td>{booking.salesConsultant}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompleteBookingList;
