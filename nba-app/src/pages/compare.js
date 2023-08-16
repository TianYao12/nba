import { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios

export default function Compare() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/teams/");
      setData(response.data.teams);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p>hello</p>
      {data ? (
        data.map((thing) => (
          <p key={thing.id}>
            {thing.city} {thing.name}
          </p>
        ))
      ) : (
        <p>nothing</p>
      )}
    </>
  );
}
