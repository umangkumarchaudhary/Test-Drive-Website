import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const carModels = [
    'A200', 'A200d', 'C200', 'C220d', 'C300',
    'E200', 'E220d', 'E350d', 'S450', 'S580'
];

const BookingForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [carModel, setCarModel] = useState('');
    const [username, setUsername] = useState('');
    const [bookings, setBookings] = useState([]);
    const [availableCars, setAvailableCars] = useState([]);

    const updateAvailability = () => {
        const available = carModels.filter((model) => {
            return isCarAvailable(model, date, startTime, endTime);
        });
        setAvailableCars(available);
    };

    const isCarAvailable = (model, date, start, end) => {
        return bookings.every((booking) => {
            if (booking.carModel === model && booking.date === date) {
                return (end <= booking.startTime || start >= booking.endTime);
            }
            return true;
        });
    };

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(savedBookings);

        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5);

        setDate(formattedDate);
        setStartTime(formattedTime);
        setEndTime(formattedTime);

        const intervalId = setInterval(updateAvailability, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        updateAvailability();
    }, [bookings]);

    const handleBooking = (e) => {
        e.preventDefault();
        const newBooking = {
            date,
            startTime,
            endTime,
            carModel,
            username,
            salesConsultant: user,
        };
        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        alert('Booking confirmed!');
        updateAvailability();
    };

    const handleCheckAvailability = () => {
        updateAvailability();
    };

    const handleViewBookings = () => {
        navigate('/booking-list');
    };

    const handleCancelBooking = (index) => {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        alert('Booking canceled!');
        updateAvailability();
    };

    const handleExtendBooking = (index, newEndTime) => {
        const updatedBookings = bookings.map((booking, i) => {
            if (i === index) {
                return { ...booking, endTime: newEndTime };
            }
            return booking;
        });
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        alert('Booking extended!');
        updateAvailability();
    };

    const getMinDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
    };

    const getMinTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div className="booking-form">
            <h2 className="booking-form-title">Book a Test Drive</h2>
            <form onSubmit={handleBooking} className="form-container">
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        min={getMinDate()}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="time"
                        value={startTime}
                        min={getMinTime()}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        value={endTime}
                        min={getMinTime()}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Car Model:
                    <select
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Car Model</option>
                        {carModels.map((model) => (
                            <option
                                key={model}
                                value={model}
                                disabled={!isCarAvailable(model, date, startTime, endTime)}
                            >
                                {model} {!isCarAvailable(model, date, startTime, endTime) && '(Unavailable)'}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="submit-btn" disabled={!user}>Book</button>
            </form>
            <button onClick={handleCheckAvailability} className="check-availability-btn">
                Check Car Availability
            </button>
            <button onClick={handleViewBookings} className="view-bookings-btn">
                View Bookings
            </button>
            <h3 className="available-cars-title">Available Cars</h3>
            <ul className="available-cars-list">
                {availableCars.map((model) => (
                    <li key={model} className="available-car-item">{model}</li>
                ))}
            </ul>
            <h3 className="bookings-title">Current Bookings</h3>
            <ul className="bookings-list">
                {bookings.map((booking, index) => (
                    <li key={index} className="booking-item">
                        <div className="booking-details">
                            <p><strong>Date:</strong> {booking.date}</p>
                            <p><strong>Start Time:</strong> {booking.startTime}</p>
                            <p><strong>End Time:</strong> {booking.endTime}</p>
                            <p><strong>Car Model:</strong> {booking.carModel}</p>
                            <p><strong>Username:</strong> {booking.username}</p>
                            <p><strong>Sales Consultant:</strong> {booking.salesConsultant}</p>
                        </div>
                        <button onClick={() => handleCancelBooking(index)} className="cancel-booking-btn">
                            Cancel Booking
                        </button>
                        <button onClick={() => handleExtendBooking(index, prompt('Enter new end time:'))} className="extend-booking-btn">
                            Extend Booking
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingForm;