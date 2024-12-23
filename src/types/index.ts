// src/types/index.ts

export interface Hotel {
  id: number;
  name: string;
  location: string;
  total_rooms: number;
  availableRooms: number;
}

export interface Booking {
  hotelId: number;
  userId: string;
  rooms: number;
  checkin: string;
  checkout: string;
}

export interface Bookings {
  id: number;
  hotel_id: number;
  user_id: string;
  rooms: number;
  checkin: string;
  checkout: string;
}

export interface User {
  id: string;
  username: string;
}
