import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Test from "./pages/test";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FormCreation from "./pages/FormCreation";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import { UserProvider } from "./components/UserContext";
import ChatList from "./pages/ChatList";
import CalendarTest from "./pages/CalendarTest";
import Date from "./pages/Date";
import TestSignup from "./pages/sessionSignup";
function Logout(){
  const navigate = useNavigate();
  localStorage.clear()
  return navigate("/login")
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/form" element={<ProtectedRoute><FormCreation /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/chat/view" element={<Chat />} />
          <Route path="/chat/list" element={<ChatList />} />
          <Route path="/calendar" element={<CalendarTest />} />
          <Route path="/calendar/:day/:date" element={<ProtectedRoute><Date /></ProtectedRoute>} />
          <Route path="/test/signup" element={<ProtectedRoute><TestSignup /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
