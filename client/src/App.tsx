import React, { useEffect } from "react";
import { getUsers } from "./features/user/userSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useTypedSelector";

function App() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users);

  return (
    <div className="App">
      <p>Test</p>
    </div>
  );
}

export default App;
