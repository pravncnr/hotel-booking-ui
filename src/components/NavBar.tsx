// src/components/Navbar.tsx
import React from 'react';
import {useUserContext} from "../context/UserContext";

type Props = {
    user: string
}
const Navbar: React.FC<Props> = ({user}) => {

    const { userId } = useUserContext(); // Access userId from context


    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {userId && <li className="nav-item">
                            <a className="nav-link" href="/hotels">Hotels</a>
                        </li> }
                        {userId && <li className="nav-item">
                            <a className="nav-link" href="/bookings">My Bookings</a>
                        </li> }
                        {!userId &&  <li className="nav-item">
                            <a className="nav-link" href="/">Login</a>
                        </li> }

                    </ul>



                </div>
                {userId && <a className="navbar-brand" href="/">
                    User logged in {user}
                </a> }
            </div>
        </nav>
    )

}

export default Navbar;
