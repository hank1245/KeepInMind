import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import "antd/dist/antd.min.css";
import Pinned from "./pages/Pinned";
import Trash from "./pages/Trash";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pinned" element={<Pinned />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
