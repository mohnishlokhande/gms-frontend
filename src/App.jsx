import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { useGetAPI } from "./api/Apis";
import { useEffect } from "react";
import { useAccountStore, useRefetchStore } from "./store/userStore";
import UsersPage from "./pages/UsersPage";
import GymPage from "./pages/GymPage";
import MembershipPage from "./pages/MembershipPage";
import LeadsPage from "./pages/LeadsPage";
import MyAccount from "./pages/AccountPage";

const protectedRoutes = [
  {
    path: "/",
    element: (
      <div id="page-wrapper" style={{ height: "90vh" }}>
        home
      </div>
    ),
  },
  { path: "/users", element: <UsersPage /> },
  { path: "/gym", element: <GymPage /> },
  {
    path: "/membership",
    element: <MembershipPage />,
  },
  {
    path: "/leads",
    element: <LeadsPage />,
  },
  {
    path: "/account",
    element: <MyAccount />,
  },
];

function App() {
  const isAuthenticated = localStorage.getItem("token");

  const accountCount = useRefetchStore((state) => state.accountCount);

  const { data: accountData = {} } = useGetAPI("user", accountCount);
  const updateAcc = useAccountStore((state) => state.setAccount);

  useEffect(() => {
    if (accountData != undefined && Object.keys(accountData).length !== 0) {
      updateAcc(accountData);
    }
  }, [accountData]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute element={route.element} />}
          />
        ))}

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
