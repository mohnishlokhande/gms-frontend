import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useGetAPI } from "./api/Apis";
import { useRefetchStore } from "./store/userStore";
import UsersPage from "./pages/UsersPage";
import GymPage from "./pages/GymPage";
import MembershipPage from "./pages/MembershipPage";
import LeadsPage from "./pages/LeadsPage";
import MyAccount from "./pages/AccountPage";
import UserProfile from "./pages/UserProfile";
import NotifyPage from "./pages/NotifyPage";

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
  {
    path: "/users/:id",
    element: <UserProfile />,
  },
  {
    path: "/users/active",
    element: <UsersPage status="active" />,
  },
  {
    path: "/users/inactive",
    element: <UsersPage status="inactive" />,
  },
  {
    path: "/notify/single",
    element: <NotifyPage />,
  },
  {
    path: "/notify/bulk",
    element: <NotifyPage />,
  },
];

function App() {
  const isAuthenticated = localStorage.getItem("token");

  const accountCount = useRefetchStore((state) => state.accountCount);
  useGetAPI("user", "account", accountCount);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

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
