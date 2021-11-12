import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { Home, History, Attendance, Profile, Register, Login } from "./pages";

function App() {
  return (
    <main className="bg-background min-h-screen">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
