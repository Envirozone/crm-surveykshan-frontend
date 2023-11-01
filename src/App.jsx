import "./App.css";
import DashBoard from "./page/DashBoard";
import LoginPage from "./page/LoginPage";
import { Route, Routes } from "react-router-dom";
import Queries from "./page/Queries";
import AddQuery from "./page/AddQuery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/queries" element={<Queries />}></Route>
        <Route path="/addQuery" element={<AddQuery />}></Route>
      </Routes>
    </>
  );
}

export default App;
