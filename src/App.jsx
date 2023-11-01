import "./App.css";
import HomePage from "./page/DashBoard";
import LoginPage from "./page/LoginPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<HomePage />}></Route>
        <Route path="/queries" element={<HomePage />}></Route>
        <Route path="/addQuery" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
