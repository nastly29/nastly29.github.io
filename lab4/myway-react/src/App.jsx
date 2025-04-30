import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MotivationalReminder from "./components/MotivationalReminder";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";  

function App() {
  return (
    <>
      <Header />
      <MotivationalReminder />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
        <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
        <Route path="/community" element={<Community />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;