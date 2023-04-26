import React, { useState } from "react";
import axios from "axios";
import AirbnbFormdata from "../interfaces/AirbnbFormdata";
import ListingDetails from "./ListingDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddListings: React.FC = () => {

    const [formData, setFormData] = useState<AirbnbFormdata>({
        _id: "",
        name: "",
        accommodates: 0,
        address: {
            country: "",
            street: ""
        },
        bathrooms: 0,
        bed_type: "",
        bedrooms: 0,
        beds: 0,
        description: "",
        host: {
            host_id: "",
            host_about: "",
            host_name: ""
        },
        price: 0,
        room_type: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://habitatsy.cyclic.app/airbnb", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
          <div className="mb-4">
              <label htmlFor="_id" className="block text-sm font-medium text-gray-700">
                Id
              </label>
              <input
                type="text"
                name="_id"
                id="_id"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
                Beds
              </label>
              <input
                type="number"
                name="beds"
                id="beds"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accommodates" className="block text-sm font-medium text-gray-700">
                Accommodates
              </label>
              <input
                type="number"
                name="accommodates"
                id="accommodates"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
/>
</div>
</div>
<div>

<div className="mb-4">
<label htmlFor="country" className="block text-sm font-medium text-gray-700">
Country
</label>
<input
             type="text"
             name="country"
             id="country"
             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
           />
</div>
<div className="mb-4">
<label htmlFor="room_type" className="block text-sm font-medium text-gray-700">
Room Type
</label>
<select
             name="room_type"
             id="room_type"
             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
           >
<option value="entire_place">Entire Place</option>
<option value="private_room">Private Room</option>
</select>
</div>
<div className="mb-4">
<button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150">
Add Listing
</button>
</div>
</div>
</form>
</div>
</div>
);
}

export default AddListings;
