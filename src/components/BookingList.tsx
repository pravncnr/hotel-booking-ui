// src/components/BookingList.tsx

import React, { useState, useEffect } from 'react';
import {Booking, Bookings} from '../types';
import { getBookings, cancelBooking, updateBooking } from '../api';
import {useUserContext} from "../context/UserContext";

interface Props {
  userId: string;
}

const BookingList: React.FC<Props> = ({ userId }) => {
  const [bookings, setBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings(userId);

      setBookings(data);
    };
    fetchBookings();
  }, [userId]);

  const handleCancel = async (bookingId: number) => {
    await cancelBooking(bookingId);
    setBookings(bookings.filter(booking => booking.hotel_id !== bookingId));
  };

  const handleUpdate = async (bookingId: number) => {
    const formattedCheckInDate = new Date().toISOString();
    const formattedCheckOutDate = new Date().toISOString();
    const updatedBooking = { ...bookings.find(b => b.hotel_id === bookingId)!, checkin: formattedCheckInDate, checkout: formattedCheckOutDate }; // example update
    await updateBooking(bookingId, updatedBooking);
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            <p>{booking.checkin} to {booking.checkout}</p>
            <button onClick={() => handleCancel(booking.id)}>Cancel {booking.id}</button>
            <button onClick={() => handleUpdate(booking.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;

