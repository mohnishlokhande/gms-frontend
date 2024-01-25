import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./components/PrivateRoute";

const protectedRoutes = [
  { path: "/", element: <div>home</div> },
  { path: "/dashboard", element: <div>dashboard</div> },
  { path: "/profile", element: <div>profile</div> },
];

function App() {
  const isAuthenticated = localStorage.getItem("token");

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
