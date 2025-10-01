import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header({ username }) {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); // 상태 초기화
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="logo">ERP SYSTEM</div>
            <div className="user-info">
                <span>{username}님</span>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </header>
    );
}