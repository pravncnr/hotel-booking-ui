// src/App.tsx

import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import HotelList from './components/HotelList';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import Login from './components/Login';
import {useUserContext} from "./context/UserContext";

const App: React.FC = () => {
    const [hotelId, setHotelId] = useState<string>('');
    const { userId } = useUserContext(); // Access userId from context



    return (
        <Router>
            <div className="App">
                {userId && <h2>Logged in as {userId} </h2> }
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/hotels/" element={<HotelList locationFilter="" setSelectedHotelId={setHotelId}  />} />

                    {/* Use 'useParams' to get hotelId */}
                    <Route
                        path="/book/:hotelId"
                        element={<BookingForm hotelId={hotelId} userId={userId} />}
                    />

                    <Route path="/bookings" element={<BookingList userId={'1'} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;