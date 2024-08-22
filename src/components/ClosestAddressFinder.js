"use client";

import { useEffect, useState } from 'react';
import { getUserLocation } from '../utils/location';
import { readExcelFile } from '../utils/excel';
import { findClosestAddress } from '../utils/distance';

const ClosestAddressFinder = () => {
  const [closestAddress, setClosestAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findAddress = async () => {
      try {
        console.log("Attempting to retrieve user location...");
        const userLocation = await getUserLocation();
        console.log("User location retrieved:", userLocation);

        console.log("Attempting to read Excel file...");
        const addresses = await readExcelFile('../Nptel_centres_TN.xlsx');

        const closest = findClosestAddress(userLocation, addresses);
        console.log("Closest address found:", closest);

        setClosestAddress(closest);
      } catch (error) {
        console.error("Error finding closest address:", error);
        setError(error.message);
      }
    };

    findAddress();
  }, []);

  const redirectToMaps = () => {
    if (closestAddress) {
      const latitude = closestAddress['LATITUDE'];
      const longitude = closestAddress['LONGITUDE'];
      const collegeName = encodeURIComponent(closestAddress['COLLEGE NAME']); // Encode the college name for the URL
  
      // Open Google Maps with the location and college name
      window.open(`https://www.google.com/maps/search/?api=1&query=${collegeName}+${latitude},${longitude}`, '_blank');
    }
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {closestAddress ? (
        <div>
          <h2 className="mb-5"><strong>Closest College Details</strong></h2>
          <p><strong>Name:</strong> {closestAddress['COLLEGE NAME']}</p>
          <p><strong>College ID:</strong> {closestAddress['LC ID']}</p>
          <p><strong>Address:</strong> {closestAddress['ADDRESS']}</p>
          <p><strong>State:</strong> {closestAddress['STATE NAME']}</p>
          <p><strong>Staff In-Charge:</strong> {closestAddress['SPOC NAME']}</p>
          <p><strong>Organized By:</strong> {closestAddress['CO-ORDINATED BY']}</p>
          <p><strong>Latitude:</strong> {closestAddress['LATITUDE']}</p>
          <p><strong>Longitude:</strong> {closestAddress['LONGITUDE']}</p>
          <button className="mt-5 p-2 bg-green-500 border-black border-2 font-bold rounded-xl cursor-pointer transition transform duration-200 hover:scale-95"
            onClick={redirectToMaps}
          >
            Open in Google Maps
          </button>
        </div>
      ) : (
        <div>Finding closest address...</div>
      )}
    </div>
  );  
};

export default ClosestAddressFinder;
