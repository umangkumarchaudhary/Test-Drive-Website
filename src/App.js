import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import BookingListPage from './pages/BookingListPage'; // Import the BookingListPage
import CompleteBookingList from './pages/CompleteBookingList'; // Import the CompleteBookingList
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

import Header from './components/Header/Header'; // Import the Header component

// Define the PrivateRoute component
const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useAuth();
    return user ? Component : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header /> {/* Include the Header component */}
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/booking" element={<PrivateRoute element={<BookingPage />} />} />
                    <Route path="/upcoming-drives" element={<PrivateRoute element={<CompleteBookingList />} />} />
                    <Route path="/booking-list" element={<PrivateRoute element={<BookingListPage />} />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> {/* Add Dashboard route */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
