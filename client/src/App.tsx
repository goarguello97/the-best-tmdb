import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetail from "./commons/MovieDetail/MovieDetail";
import ProfileDetail from "./commons/ProfileDetail/ProfileDetail";
import Navbar from "./components/Navbar/Navbar";
import { persist } from "./features/user/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useTypedSelector";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { TabTitle } from "./utils/generalFunctions";
// import Modal from "./components/Modal/Modal"

function App() {
  const dispatch = useAppDispatch();
  const { userLogged } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(persist());
  }, []);

  TabTitle("The Best TMDB");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:typeFilm/:id/*" element={<MovieDetail />} />
        <Route path="/profile" element={<ProfileDetail />} />
        {/* <Login/> */}
        {/* <Modal/> */}
        {/* <Landing /> */}
      </Routes>
    </Router>
  );
}

export default App;
