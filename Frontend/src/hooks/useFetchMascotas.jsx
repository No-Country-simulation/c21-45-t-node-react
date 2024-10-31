import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMascotas = (filters) => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/mascota/filtro", filters);
        setMascotas(response.data);
        console.log("mascotas devueltas", mascotas);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, [filters]);

  return { mascotas, loading };
};

export default useFetchMascotas;
