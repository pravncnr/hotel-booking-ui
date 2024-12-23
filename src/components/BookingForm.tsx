import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Booking } from '../types';
import { createBooking } from '../api';
import { useUserContext } from "../context/UserContext";

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
    const navigate = useNavigate(); // Get the navigate function

    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const getCheckoutDate = () => {
        if (checkInDate) {
            const futureDate = new Date(checkInDate);
            futureDate.setDate(futureDate.getDate() + 1);
            return futureDate.toISOString().split('T')[0];
        }
        return getTomorrow();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formattedCheckInDate = new Date(checkInDate).toISOString();
        const formattedCheckOutDate = new Date(checkOutDate).toISOString();

        const booking: Booking = {
            hotelId: parseInt(hotelId!),
            userId: userId, // Get userId based on login state
            rooms,
            checkin: formattedCheckInDate,
            checkout: formattedCheckOutDate,
        };

        await createBooking(booking);
        alert('Booking successful!');
        navigate('/bookings');
    };

    return (
        <div className="container-sm">
            <h2 className="mb-4">Book Your Stay</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="rooms" className="form-label">
                        Rooms:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="rooms"
                        value={rooms}
                        min={1}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="checkInDate" className="form-label">
                        Check-in Date:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkInDate"
                        value={checkInDate}
                        min={getTomorrow()}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        disabled={rooms===0 || rooms<=0}
                        required

                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="checkOutDate" className="form-label">
                        Check-out Date:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkOutDate"
                        value={checkOutDate}
                        min={getCheckoutDate()}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                        disabled={checkInDate===''}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
