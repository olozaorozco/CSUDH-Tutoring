import FormDisplay from "../components/FormDisplay";
import axios from "axios";
import { useState, useEffect } from "react";

function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tutoringforms/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  return (
    <div>
      {data.length > 0 && data.map((form) => <FormDisplay Form={form} />)}
    </div>
  );
}

export default Test;
