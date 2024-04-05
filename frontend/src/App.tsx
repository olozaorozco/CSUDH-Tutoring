import ListGroup from "./components/ListGroup";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
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
      {data.length > 0 && (
        <ListGroup
          items={data.map((item, index) => (
            <div key={item.id}>
              <h1>{item.Tutor.first_name}</h1>
              <ul key={`${item.id}-${index}`}>
                {item.courses.map((course, index) => (
                  <li key={`${item.id}-${course.id}`}>{course.Title}</li>
                ))}
              </ul>
            </div>
          ))}
          heading="Tutors"
        />
      )}

      {error && <p>Error fetching data: {error.message}</p>}
    </div>
  );
}

export default App;
