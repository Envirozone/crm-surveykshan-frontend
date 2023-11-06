import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../page/AdminDashboard";
import UserDashBoard from "../page/UserDashBoard";
import LoginPage from "../page/LoginPage";
import Denied from "../page/Denied";
import PageNotFound from "../page/PageNotFound";
import RequireAuth from "../helper/RequireAuth";
import QueryInfo from "../page/QueryInfo";
import Queries from "../page/Queries";
import AddQuery from "../page/AddQuery";
import AdminAllQueryPage from "../page/AdminAllQueryPage";
import AdminQueryInfo from "../page/AdminQueryInfo";
import AdminAddQuery from "../page/AdminAddQuery";
const AllRoutes = () => {
  let isUserLoggedIn = localStorage.getItem("isLoggedIn");
  let userRole = localStorage.getItem("role");
  return (
    <Routes>
      {(isUserLoggedIn === "true" && userRole === "client") ||
      userRole === "admin" ? (
        <Route
          path="/"
          element={
            userRole === "admin" ? <AdminDashboard /> : <UserDashBoard />
          }
        />
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
      <Route path="/denied" element={<Denied />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>

      <Route element={<RequireAuth allowRole={["client"]} />}>
        <Route path="/queries/:id" element={<QueryInfo />}></Route>
        <Route path="/queries" element={<Queries />}></Route>
        <Route path="/addQuery" element={<AddQuery />}></Route>
      </Route>
      <Route element={<RequireAuth allowRole={["admin"]} />}>
        <Route path="/all-queries" element={<AdminAllQueryPage />}></Route>
        <Route path="/all-queries/:id" element={<AdminQueryInfo />}></Route>
        <Route path="/adminaddQuery" element={<AdminAddQuery />}></Route>
      </Route>
      {/* Example to add route for both user and admin in future  */}
      {/* <Route element={<RequireAuth allowRole={["client", "admin"]} />}>
          <Route path="/contact-us" element={<DashBoard />}></Route>
        </Route> */}
    </Routes>
  );
};

export default AllRoutes;
