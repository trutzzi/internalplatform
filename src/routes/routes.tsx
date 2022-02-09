import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from '../pages/login'
import Create from '../pages/create';
import Signup from "../pages/signup";
import { useAuthContext } from "../hooks/useAuthContext";
import Employee from '../pages/employee/employee';
import MyTasks from "../pages/mytasks/mytasks";
import AllTasks from "../pages/alltasks/alltasks";

const RoutesComp: FC = () => {
  const { user } = useAuthContext();
  return (<Routes>
    <Route path="/"
      element={user ? <MyTasks /> : <Login />}
    />
    <Route path="/AllTasks"
      element={user?.admin ? <AllTasks /> : <Navigate replace to={"/"} />}
    />
    <Route path="/Login"
      element={user ? <Navigate replace to="/" /> : <Login />}
    />
    <Route path="/Signup"
      element={user ? <Navigate replace to="/" /> : <Signup />}
    />
    <Route path="/Create"
      element={user?.admin ? <Create /> : <Navigate replace to="/" />}
    />
    <Route
      path="/Tasks"
      element={user ? <MyTasks /> : <Navigate replace to="/Login" />}
    />
    <Route
      path="/Employee"
      element={user?.admin ? <Employee /> : <Navigate replace to="/Login" />}
    />
  </Routes>);
};
export default RoutesComp