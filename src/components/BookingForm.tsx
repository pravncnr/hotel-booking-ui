// src/components/BookingForm.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Booking } from '../types';
import { createBooking } from '../api';
import {useUserContext} from "../context/UserContext";


interface BookingFormProps {
    userId: string;
    hotelId: string;
}
const BookingForm: React.FC<BookingFormProps> = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [rooms, setRooms] = useState(1);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
    const { userId } = useUserContext(); // Access userId from context

  const handleSubmit = async (e: React.FormEvent) => {
      const formattedCheckInDate = new Date(checkInDate).toISOString();
      const formattedCheckOutDate = new Date(checkOutDate).toISOString();
    e.preventDefault();
    const booking: Booking = {
      hotelId: parseInt(hotelId!),
      userId: userId,  // Get userId based on login state
      rooms,
        checkin: formattedCheckInDate,
        checkout: formattedCheckOutDate,
    };
    await createBooking(booking);
    alert('Booking successful!');
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rooms:</label>
          <input
              type="number"
              value={rooms}
              onChange={e => setRooms(Number(e.target.value))}
              min="1"
          />
        </div>
        <div>
          <label>Check-in Date:</label>
          <input
              type="date"
              value={checkInDate}
              onChange={e => setCheckInDate(e.target.value)}
          />
        </div>
        <div>
          <label>Check-out Date:</label>
          <input
              type="date"
              value={checkOutDate}
              onChange={e => setCheckOutDate(e.target.value)}
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
  );
};

export default BookingForm;
