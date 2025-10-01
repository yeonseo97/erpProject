import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Submenu from "./Submenu";
import "../styles/Layout.css";
import {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
    // 사용자 정보
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div className="layout">
            {/* 상단 헤더 */}
            <Header username={user?.name || "사용자"} />

            <div className="layout-body">
                {/* 좌측 메뉴 */}
                <Submenu />

                {/* 우측 Content 영역 */}
                <div className="layout-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}