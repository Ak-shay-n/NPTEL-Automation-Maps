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

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {closestAddress ? (
        <div>
          <h2><strong>Closest College Details</strong></h2>
          <p><strong>Name:</strong> {closestAddress['COLLEGE NAME']}</p>
          <p><strong>College ID:</strong> {closestAddress['LC ID']}</p>
          <p><strong>Address:</strong> {closestAddress['ADDRESS']}</p>
          <p><strong>State:</strong> {closestAddress['STATE NAME']}</p>
          <p><strong>Staff In-Charge:</strong> {closestAddress['SPOC NAME']}</p>
          <p><strong>Organized By:</strong> {closestAddress['CO-ORDINATED BY']}</p>
          <p><strong>Location:</strong> {closestAddress['ADDRESS']}</p>
          <p><strong>Latitude:</strong> {closestAddress['LATITUDE']}</p>
          <p><strong>Longitude:</strong> {closestAddress['LONGITUDE']}</p>
        </div>
      ) : (
        <div>Finding closest address...</div>
      )}
    </div>
  );  
};

export default ClosestAddressFinder;
