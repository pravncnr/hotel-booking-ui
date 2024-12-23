import React, { useState, useEffect } from "react";
import { Bookings } from "../types";
import { getBookings, cancelBooking, updateBooking } from "../api";
import { useUserContext } from "../context/UserContext";
// @ts-ignore
import hotelImage from "../hotelimg.png"; // Import the image

interface Props {
  userId: string;
}

const BookingList: React.FC<Props> = ({ userId }) => {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);
  const [rooms, setRooms] = useState<number>(1);
  const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      const user = sessionStorage.getItem("userId") ?? "";
      const data = await getBookings(userId ?? user);
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (selectedBooking) {
      await cancelBooking(selectedBooking.id);
      setBookings(
        bookings.filter((booking) => booking.id !== selectedBooking.id),
      );
      setShowCancelModal(false); // Close modal after cancel
    }
  };

  const handleUpdate = async () => {
    if (selectedBooking) {
      const updatedBooking = {
        ...selectedBooking,
        rooms,
        checkin,
        checkout,
      };

      try {
        await updateBooking(selectedBooking.id, updatedBooking);
        setBookings(
            bookings.map((booking) =>
                booking.id === selectedBooking.id
                    ? {...booking, ...updatedBooking}
                    : booking,
            ),
        );
        setShowUpdateModal(false); // Close modal after update
      }
      catch (err){
        console.log(err);
        setError("Update Failed")
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Bookings</h2>
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-12 mb-3">
            <div
              className="card"
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="row g-0 align-items-center">
                <div className="col-4">
                  <img
                    src={hotelImage}
                    alt="Hotel"
                    className="img-fluid rounded-start"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body p-2">
                    <h5
                      className="card-title"
                      style={{ fontSize: "1rem", marginBottom: "0.5rem" }}
                    >
                      Booking ID: {booking.id}
                    </h5>
                    <p
                      className="card-text mb-1"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <strong>Check-in:</strong> {booking.checkin}
                    </p>
                    <p
                      className="card-text mb-1"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <strong>Check-out:</strong> {booking.checkout}
                    </p>
                    <p
                      className="card-text mb-2"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <strong>Rooms:</strong> {booking.rooms}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowCancelModal(true);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setCheckin(booking.checkin);
                          setCheckout(booking.checkout);
                          setRooms(booking.rooms);
                          setShowUpdateModal(true);
                          setError('');
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Booking</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowCancelModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this booking?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCancelModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Booking</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowUpdateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger" role="alert">
                  {error}
                </div>}

                <div className="mb-3">
                  <label htmlFor="rooms" className="form-label">
                    Rooms:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rooms"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkin" className="form-label">
                    Check-in Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkin"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkout" className="form-label">
                    Check-out Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkout"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;
