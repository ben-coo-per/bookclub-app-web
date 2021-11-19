import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChangePasswordForm } from "./components/Auth/ChangePasswordForm";
import { ForgotForm } from "./components/Auth/ForgotForm";
import { NavBar } from "./components/Navbar";
import {
  Home,
  History,
  Attendance,
  Profile,
  Register,
  Login,
  Forgot,
  ChangePassword,
} from "./pages";

function App() {
  return (
    <main className="bg-background min-h-screen">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot">
              <Route index element={<Forgot />} />
              <Route
                path="change-password/:token"
                element={<ChangePassword />}
              />
            </Route>
          </Route>

          <Route path="history" element={<History />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
