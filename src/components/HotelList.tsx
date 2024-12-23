// src/components/HotelList.tsx
import React, { useState, useEffect } from "react";
import { Hotel } from "../types";
import { getHotels } from "../api";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import hotelImg from "../hotelimg.png";

interface Props {
  locationFilter: string;
  setSelectedHotelId: Function;
}

const HotelList: React.FC<Props> = ({ setSelectedHotelId }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const { userId } = useUserContext(); // Access userId from context
  const [location, setLocation] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchHotels = async () => {
      const data = await getHotels();
      setHotels(data);
    };
    fetchHotels();
  }, []);

  // @ts-ignore
  const uniqueLocations = [...new Set(hotels.map((hotel) => hotel.location))];

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Pane for Location Filter */}
        <div className="col-md-3">
          <h4>Filter by Location</h4>
          <select
            className="form-select"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Right Pane for Hotel Cards */}
        <div className="col-md-9">
          <div className="row">
            {hotels
              .filter((hotel) =>
                location
                  ? hotel.location.toLowerCase() === location.toLowerCase()
                  : true,
              )
              .map((hotel) => (
                <div className="col-md-4 mb-4" key={hotel.id}>
                  <div className="card">
                    <img
                      src={hotelImg}
                      className="card-img-top"
                      alt={hotel.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <p className="card-text">
                        <strong>Location:</strong> {hotel.location}
                      </p>
                      <p className="card-text">
                        <strong>Available Rooms:</strong> {hotel.total_rooms}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedHotelId(hotel.id);
                          navigate(`/book/${hotel.id}`);
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
