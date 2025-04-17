import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MotivationalReminder from "./components/MotivationalReminder";

function App() {
  return (
    <>
      <Header />
      <MotivationalReminder />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;