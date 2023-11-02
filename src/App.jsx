import "./App.css";
import DashBoard from "./page/DashBoard";
import LoginPage from "./page/LoginPage";
import { Route, Routes } from "react-router-dom";
import Queries from "./page/Queries";
import AddQuery from "./page/AddQuery";
import RequireAuth from "./helper/RequireAuth";
import AdminDashboard from "./page/AdminDashboard";
import Denied from "./page/Denied";
import PageNotFound from "./page/PageNotFound";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>

        <Route element={<RequireAuth allowRole={["client"]} />}>
          <Route path="/user/dashboard" element={<DashBoard />}></Route>
          <Route path="/queries" element={<Queries />}></Route>
          <Route path="/addQuery" element={<AddQuery />}></Route>
        </Route>
        <Route element={<RequireAuth allowRole={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/all-queries" element={<Queries />}></Route>
        </Route>
        <Route element={<RequireAuth allowRole={["client", "admin"]} />}>
          <Route path="/contact-us" element={<DashBoard />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
