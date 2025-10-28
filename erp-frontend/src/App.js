import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DepartmentManage from "./pages/humanResources/departmentManage";
import BomManage from "./pages/manufacturing/bomManage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/AuthContext";
import { useState, useEffect } from "react";

function App() {
    const [user, setUser] = useState(null);

    // 로그인 시 localStorage에서 사용자 정보 가져오기
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="humanResources/departmentManage" element={<DepartmentManage />} />
                        <Route path="manufacturing/bomManage" element={<BomManage />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Route>
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
