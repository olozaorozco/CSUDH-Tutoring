import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Test from "./pages/test";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FormCreation from "./pages/FormCreation";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<FormCreation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
