import { useEffect, useState } from "react";

import { getAllVehicles } from "./vehicleAPI";

const useVehicles = () => {

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchVehicles = async () => {

      try {

        const data = await getAllVehicles();

        setVehicles(data);

      } catch (error) {

        console.log(error);

        setError("Failed to fetch vehicles");

      } finally {

        setLoading(false);
      }
    };

    fetchVehicles();

  }, []);

  return {
    vehicles,
    loading,
    error,
  };
};

export default useVehicles;