// src/api.ts

import axios from "axios";
import { Hotel, Booking, User, Bookings } from "./types";

// Base URL for your backend API
const API_URL = "http://localhost:3001/api"; // Replace with your backend API URL

export const getHotels = async (): Promise<Hotel[]> => {
  const response = await axios.get(`${API_URL}/hotels`);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createBooking = async (booking: Booking): Promise<Booking> => {
  const response = await axios.post(`${API_URL}/bookings`, booking);
  return response.data;
};

export const getBookings = async (userId: string): Promise<Bookings[]> => {
  const response = await axios.get(`${API_URL}/bookings/${userId}`);
  return response.data;
};

export const updateBooking = async (
  bookingId: number,
  booking: Bookings,
): Promise<Bookings> => {
  const response = await axios.put(`${API_URL}/bookings/${bookingId}`, booking);
  return response.data;
};

export const cancelBooking = async (bookingId: number): Promise<void> => {
  await axios.delete(`${API_URL}/bookings/${bookingId}`);
};
