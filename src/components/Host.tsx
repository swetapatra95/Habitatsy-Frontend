import React, { useState } from "react";


type HostProps = {
    host : {
        host_id: "Number",
          host_about: "String",
          host_has_profile_pic: Boolean,
          host_indentity_verified: Boolean,
          host_is_superhost: Boolean,
          host_listings_count: "Number",
          host_location: "String",
          host_name: "String",
          host_neighbourhood: "String",
          host_picture_url: "String",
          host_response_rate: "Number",
          host_response_time: "String",
          host_thumbnail_url: "String",
          host_total_listings_count: "Number",
          host_url: "String",
          host_verifications: ["String"],
          house_rules: "String"
    }
}    


const Host = ({ host }: HostProps)  => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center mb-4">
        <img
          className="rounded-full h-32 w-32 md:h-48 md:w-48 object-cover mx-auto md:mx-0"
          src={host.host_picture_url}
          alt={host.host_name}
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-2">{host.host_name}</h1>
          <p className="text-gray-700">{host.host_location}</p>
          <p className="text-gray-700">{host.host_neighbourhood}</p>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-8">
        <h2 className="text-xl font-bold mb-4">About {host.host_name}</h2>
        <p className="text-gray-700">{host.host_about}</p>
      </div>
      <div className="border-t border-gray-300 pt-8">
  <h2 className="text-xl font-bold mb-4">Host Information</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
    <div className="grid grid-cols-2 shadow-md p-4 mb-4 ">
      <p className="text-gray-700">Verified identity:</p>
      <p>{host.host_indentity_verified ? "Yes" : "No"}</p>
    </div>
    <div className="grid grid-cols-2 shadow-md p-4 mb-4 ">
      <p className="text-gray-700">Superhost:</p>
      <p>{host.host_is_superhost ? "Yes" : "No"}</p>
    </div>
    <div className="grid grid-cols-2 shadow-md p-4 mb-4 ">
      <p className="text-gray-700">Response rate:</p>
      <p>{host.host_response_rate}%</p>
    </div>
    <div className="grid grid-cols-2 shadow-md p-4 mb-4 " >
      <p className="text-gray-700">Response time:</p>
      <p>{host.host_response_time}</p>
    </div>
    <div className="grid grid-cols-2 shadow-md p-4 mb-4 ">
      <p className="text-gray-700">Listings:</p>
      <p>{host.host_listings_count}</p>
    </div>
  </div>
</div>

</>
);
};

export default Host;
