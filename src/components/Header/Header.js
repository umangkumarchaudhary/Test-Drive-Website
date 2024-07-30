import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const { user } = useAuth(); // Get user from authentication context

    // If there is no user, return null or render nothing
    if (!user) {
        return null;
    }

    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/booking">Booking Page</Link>
                    </li>
                    <li>
                        <Link to="/upcoming-drives">Complete Booking List</Link>
                    </li>
                    <li>
                        <Link to="/booking-list">Upcoming Scheduled Drive</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
