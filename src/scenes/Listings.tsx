import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";
import AirbnbListing from "../interfaces/AirbnbListing";
import ListingDetails from "./ListingDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};


const Listings: React.FC = () => {
  const [listings, setListings] = useState<AirbnbListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        const response = await axios.get<AirbnbListing[]>(`https://habitatsy.cyclic.app/airbnb?page=${page}&perPage=${perPage}`,config);
        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error retrieving data from server");
        setLoading(false);
      }
    };
    fetchListings();
  }, [page, perPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const navigate = useNavigate();

  const handleListingClick = (listing: AirbnbListing) => {
    navigate(`/listings/${listing._id}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <div>
    <Navbar />
        <div className="flex flex-col items-center mt-20">
          <div className="w-full max-w-screen-xl">
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="perPage" className="mr-2 font-bold">
                
              </label>
              <select
                id="perPage"
                value={perPage}
                onChange={(e) =>
                  handlePerPageChange(parseInt(e.target.value))
                }
                className="border border-gray-400 rounded px-2 py-1"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {listings.map((listing) => (
                <li
                  key={listing._id}
                  onClick={() => handleListingClick(listing)}
                  className="cursor-pointer border border-gray-400 rounded-lg p-4 flex flex-col justify-between"
                >
                  <img
                    src={listing.images.picture_url}
                    alt={listing.name}
                    className="mb-4 w-50 h-50 max-h-48"
                  />
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{listing.name}</h4>
                    <p className="text-gray-700">{listing.address.country}</p>
                    <p className="font-bold">${listing.price} per night</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-6 mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                >
                Previous Page
                </button>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => handlePageChange(page + 1)}
                >
                Next Page
                </button>
                </div>
                </div>
                </div>
                <Footer />
                </div>
                
                );
                };
                
                export default Listings;
