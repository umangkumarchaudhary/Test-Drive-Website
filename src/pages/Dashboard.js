import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Dashboard.css'; // Import your CSS for styling

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [selectedDateBookings, setSelectedDateBookings] = useState([]);

    useEffect(() => {
        // Load bookings from localStorage
        const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(savedBookings);
    }, []);

    useEffect(() => {
        // Filter bookings by the selected date
        const selectedDate = date.toISOString().split('T')[0];
        const filteredBookings = bookings.filter(booking => booking.date === selectedDate);
        setSelectedDateBookings(filteredBookings);
    }, [date, bookings]);

    // Generate a color for each sales consultant
    const getColor = (salesConsultant) => {
        if (!salesConsultant) return '#CCCCCC'; // Default color if salesConsultant is missing

        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F833FF', '#FF33A1', '#33FFF4'];
        const index = salesConsultant.charCodeAt(0) % colors.length;
        return colors[index];
    };

    // Highlight dates with bookings
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            const hasBooking = bookings.some(booking => booking.date === formattedDate);
            return hasBooking ? 'highlight-date' : null;
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileClassName={tileClassName}
                />
            </div>
            <div className="bookings-container">
                <h3>Bookings for {date.toDateString()}</h3>
                {selectedDateBookings.length > 0 ? (
                    <ul className="booking-list">
                        {selectedDateBookings.map((booking, index) => (
                            <li
                                key={index}
                                className="booking-item"
                                style={{ borderLeft: `5px solid ${getColor(booking.salesConsultant)}` }}
                            >
                                <p><strong>Start Time:</strong> {booking.startTime}</p>
                                <p><strong>End Time:</strong> {booking.endTime}</p>
                                <p><strong>Car Model:</strong> {booking.carModel}</p>
                                <p><strong>Username:</strong> {booking.username}</p>
                                <p><strong>Sales Consultant:</strong> {booking.salesConsultant || 'N/A'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-bookings-message">No bookings for this date.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
