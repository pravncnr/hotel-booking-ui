// src/App.tsx

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import HotelList from "./components/HotelList";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import Login from "./components/Login";
import { useUserContext } from "./context/UserContext";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  const [hotelId, setHotelId] = useState<string>("");
  const { userId } = useUserContext(); // Access userId from context
  // const userId = sessionStorage.getItem("userId") ?? '';

  return (
    <Router>
      <div className="App">
        <NavBar user={userId} />

        <Routes>
          <Route path="/" element={<Login />} />

          {userId && (
            <Route
              path="/hotels/"
              element={
                <HotelList locationFilter="" setSelectedHotelId={setHotelId} />
              }
            />
          )}

          {userId && (
            <Route
              path="/book/:hotelId"
              element={<BookingForm hotelId={hotelId} userId={userId} />}
            />
          )}

          {userId && (
            <Route path="/bookings" element={<BookingList userId={userId} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
