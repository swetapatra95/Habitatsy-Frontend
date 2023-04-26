import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ListingDetails from '../scenes/ListingDetails';
import AirbnbListing from "../interfaces/AirbnbListing";

const Delete = () => {
  const [listings, setListings] = useState<AirbnbListing[]>([]);

  const handleDelete = (id:string) => {
    axios.delete(`https://habitatsy.cyclic.app/airbnb/${id}`)
      .then((res) => {
        console.log(res.data);
        setListings(listings.filter((listing) => listing._id !== id));
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    axios.get('/airbnb')
      .then((res) => setListings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {listings.map((listing) => (
        <ListingDetails key={listing._id}  />
      ))}
    </div>
  );
};

export default Delete;
