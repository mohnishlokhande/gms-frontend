import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { useGetAPI } from "./api/Apis";
import { useEffect } from "react";
import { useAccountStore } from "./store/userStore";

const protectedRoutes = [
  { path: "/", element: <div id="page-wrapper">home</div> },
  {
    path: "/dashboard",
    element: (
      <div id="page-wrapper">
        <div className="main-page">dashboard</div>
      </div>
    ),
  },
  { path: "/profile", element: <div>profile</div> },
];

function App() {
  const isAuthenticated = localStorage.getItem("token");

  const { data: accountData = {} } = useGetAPI("user");
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
