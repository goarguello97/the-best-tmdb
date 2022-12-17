import React, { useEffect } from "react";
import { login } from "./features/user/authSlice";
import { getUser } from "./features/user/userSlice";
import { getUsers } from "./features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useTypedSelector";

function App() {
  // const { users } = useAppSelector((state) => state.users);
  // const { user } = useAppSelector((state) => state.user);
  const { auth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(
    //   login({
    //     email: "usuario@mail.com",
    //     password: "Contraseña",
    //   })
    // );
  }, [dispatch]);

  return (
    <div className="App">
      <p>Test</p>
    </div>
  );
}

export default App;
