import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Layout from "./pages/layout/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<div>home</div>}></Route>
          </Route>

          {/* <Route element={<Navigate to={"/login"} replace />} /> */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
