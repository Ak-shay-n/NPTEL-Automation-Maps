export const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLon / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };  
  
  export const findClosestAddress = (userLocation, addresses) => {
    let closestAddress = null;
    let minDistance = Infinity;
  
    addresses.forEach((address) => {
      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        address['Latitude'], // Updated to match the exact column name in Excel
        address['Longitude'],  // Updated to match the exact column name in Excel
      );
  
      if (distance < minDistance) {
        minDistance = distance;
        closestAddress = address;
      }
    });
  
    return closestAddress;
  };  