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
        const addresses = await readExcelFile('../NPTEL-College-Coordinates.xlsx');

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
          <p><strong>Name:</strong> {closestAddress['Name of the College']}</p>
          <p><strong>College ID:</strong> {closestAddress['College ID']}</p>
          <p><strong>Status:</strong> {closestAddress['Status']}</p>
          <p><strong>Address:</strong> {closestAddress.Address}</p>
          <p><strong>State:</strong> {closestAddress.State}</p>
          <p><strong>Staff In-Charge:</strong> {closestAddress['Staff InCharge']}</p>
          <p><strong>Organized By:</strong> {closestAddress['Organized By']}</p>
          <p><strong>Location:</strong> {closestAddress.Location}</p>
          <p><strong>Latitude:</strong> {closestAddress.Latitude}</p>
          <p><strong>Longitude:</strong> {closestAddress.Longitude}</p>
        </div>
      ) : (
        <div>Finding closest address...</div>
      )}
    </div>
  );  
};

export default ClosestAddressFinder;
