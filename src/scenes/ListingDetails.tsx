import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AirbnbListing from "../interfaces/AirbnbListing";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Host from "../components/Host";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBed, faDoorClosed, faBath, faHome } from "@fortawesome/free-solid-svg-icons";


const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};


const ListingDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
    const [listing, setListing] = useState<AirbnbListing | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingDates, setBookingDates] = useState<string[]>([]);

    useEffect(() => {
        const fetchListing = async () => {
            setLoading(true);
            try {
                const response = await axios.get<AirbnbListing>(
                    `https://habitatsy.cyclic.app/airbnb/${id}`,
                    config
                );
                setListing(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error retrieving data from server");
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    const handleBookClick = async () => {
        try {
            const response = await axios.post(
                `https://habitatsy.cyclic.app/bookings`,
                {
                    listing_id: listing?._id,
                    user_id: localStorage.getItem("userId"),
                    check_in: bookingDates[0],
                    check_out: bookingDates[1],
                },
                config
            );
            alert(`Booking ${listing?.name} ${localStorage.getItem('user_id')} for ${bookingDates.join(", ")}!`);
            
        } catch (err) {
            console.error(err);
            alert("Error booking listing");
        }
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(
                `https://habitatsy.cyclic.app/airbnb/${id}`,
                config
            );
            alert(`Listing ${listing?.name} deleted!`);
            navigate("/");
            
            // Redirect to home page or listing index page after deletion
        } catch (err) {
            console.error(err);
            alert("Error deleting listing");
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !listing) {
        return <div>{error ?? "Listing not found"}</div>;
    }

    return (
        <div>
            <Navbar />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16">
                <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
                    <h1 className="text-3xl font-bold mb-6">{listing.name}</h1>
                    <p className="text-gray-700 mb-10 font-semibold">{listing.address.street}</p>
                    <img
                        src={listing.images.picture_url}
                        alt={listing.name}
                        className="mb-10 max-w-full rounded-md shadow-md"
                    />
                    <p className="text-gray-700 mb-10 leading-relaxed">{listing.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>
                                <FontAwesomeIcon icon={faUsers} /> {listing.accommodates} guests
</p>
<p>
<FontAwesomeIcon icon={faBed} /> {listing.beds} beds
</p>
<p>
<FontAwesomeIcon icon={faDoorClosed} /> {listing.bedrooms} bedrooms
</p>
<p>
<FontAwesomeIcon icon={faBath} /> {listing.bathrooms} bathrooms
</p>
</div>
<div>
<p>
<FontAwesomeIcon icon={faHome} /> {listing.room_type}
</p>
<p>
Price: ${listing.price} per night
</p>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
<h2 className="text-2xl font-bold mb-6">Host</h2>
<Host host={listing.host} />
{role === "admin" && (

<button className="bg-indigo-500 text-white py-2 px-4 rounded-md mt-6" onClick={handleDeleteClick}>Delete Listing</button>
)}
</div>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16">
            <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Availability</h2>
                <p className="text-gray-700 mb-6">Select dates to book:</p>
                <input
                    type="date"
                    value={bookingDates[0]}
                    onChange={(e) => setBookingDates([e.target.value, bookingDates[1]])}
                    className="rounded-md shadow-md mb-4 p-2"
                />
                <input
                    type="date"
                    value={bookingDates[1]}
                    onChange={(e) => setBookingDates([bookingDates[0], e.target.value])}
                    className="rounded-md shadow-md mb-6 p-2"
                />
                <div className="flex space-x-4">
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-md mt-6" onClick={handleBookClick}>Book Listing</button>
                </div>
            </div>
        </div>

        <Footer />
    </div>
);
};

export default ListingDetails;






