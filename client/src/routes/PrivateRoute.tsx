import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { persist } from "../features/user/authSlice";
import { submitted } from "../features/flags/flagsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import Loader from "../commons/Loader/Loader";

const PrivateRoute = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn, isLoading, userLogged } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(persist());
  }, []);

  return isLoading ? (
    <Loader />
  ) : isUserLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
