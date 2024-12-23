// src/components/HotelList.tsx

import React, { useState, useEffect } from 'react';
import { Hotel } from '../types';
import { getHotels } from '../api';
import { useUserContext } from '../context/UserContext';
import {useNavigate} from "react-router-dom";


interface Props {
  locationFilter: string;
    setSelectedHotelId: Function;
}

const HotelList: React.FC<Props> = ({ locationFilter, setSelectedHotelId }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const { userId } = useUserContext(); // Access userId from context
  const [location, setLocation] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchHotels = async () => {
      const data = await getHotels();
      setHotels(data);
    };
    fetchHotels();
  }, []);

  return (
      <div>
      <div>
        <h2>Location</h2>
        <select onChange={e => {setLocation(e.target.value);  }} value={location}>
          <option value="">Select location</option>
          {hotels.map(hotel => (
              <option key={hotel.location} value={hotel.location}>{hotel.location}</option>
          ))}
        </select>
      </div>

        { location && <div>
      <h2>Hotels</h2>
      <ul>
        {hotels
          .filter(hotel => hotel.location.toLowerCase().includes(location.toLowerCase()))
          .map(hotel => (
            <li key={hotel.id}>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>Available Rooms: {hotel.total_rooms}</p>
                <button onClick={()=> {setSelectedHotelId(hotel.id); navigate(`/book/${hotel.id}`)}}>Book</button>
            </li>

          ))}
      </ul>
    </div>

        }
      </div>
  );
};

export default HotelList;

