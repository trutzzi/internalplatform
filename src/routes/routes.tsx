import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import Create from '../pages/create';
import Signup from '../pages/signup';
import { useAuthContext } from '../hooks/useAuthContext';
import Employee from '../pages/employee/employee';
import MyTasks from '../pages/mytasks/myTasks';
import AllTasks from '../pages/alltasks/alltasks';
import { PAGES } from '../components/Navigator';

const RoutesComp: FC = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <MyTasks /> : <Login />}
      />
      <Route
        path={PAGES.ALL_TASKS.href}
        element={user?.admin ? <AllTasks /> : <Navigate replace to="/" />}
      />
      <Route
        path={PAGES.LOGIN.href}
        element={user ? <Navigate replace to="/" /> : <Login />}
      />
      <Route
        path={PAGES.SIGNUP.href}
        element={user ? <Navigate replace to="/" /> : <Signup />}
      />
      <Route
        path={PAGES.CREATE_TASK.href}
        element={user?.admin ? <Create /> : <Navigate replace to="/" />}
      />
      <Route
        path={PAGES.TASKS.href}
        element={user ? <MyTasks /> : <Navigate replace to="/Login" />}
      />
      <Route
        path={PAGES.EMPLOYEE.href}
        element={user?.admin ? <Employee /> : <Navigate replace to="/Login" />}
      />
    </Routes>
  );
};
export default RoutesComp;
