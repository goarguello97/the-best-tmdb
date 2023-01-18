import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login-Register/Login-Register";
// import Lorem from "./components/Lorem/Lorem";
import Navbar from "./components/Navbar/Navbar";
import { persist } from "./features/user/authSlice";
import { useAppDispatch } from "./hooks/useTypedSelector";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
// import Modal from "./components/Modal/Modal"

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(persist());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Login/> */}
        {/* <Modal/> */}
        {/* <Landing /> */}
      </Routes>
    </Router>
  );
}

export default App;
