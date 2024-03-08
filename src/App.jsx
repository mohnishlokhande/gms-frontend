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
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import NotifyBulkPage from "./pages/NotifyBulkPg";
import SettingsPage from "./pages/SettingsPage";

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
    element: <NotifyBulkPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

function App() {
  const isAuthenticated = localStorage.getItem("token");

  const accountCount = useRefetchStore((state) => state.accountCount);
  useGetAPI("user", "account", accountCount);

  const aleadyLoggedIn = (element) => {
    if (isAuthenticated) return <Navigate to="/" />;
    return element;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={aleadyLoggedIn(<Login />)} />
        <Route
          path="/forgot-password"
          element={aleadyLoggedIn(<ForgotPassword />)}
        />
        <Route
          path="/change-password"
          element={aleadyLoggedIn(<ResetPassword />)}
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
