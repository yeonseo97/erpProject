import { useNavigate } from "react-router-dom";
import menuConfig from "../config/menuConfig";

export default function Submenu() {
    const navigate = useNavigate();

    // 로그인한 사용자 정보 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.role?.replace("ROLE_", ""); // ROLE_USER, ROLE_ADMIN

    // 메뉴 필터링 함수(메뉴 목록에서 내 권한(role) 이 포함된 것)
    // - 상위 메뉴 및 하위 메뉴 모두 userRole이 포함된 항목만 남김
    const filterMenuByRole = (menus, role) => {
        return menus
            .filter(menu => menu.roles.includes(role)) // ① 상위 메뉴 권한 확인
            .map(menu => ({
                ...menu,
                children: menu.children
                    ? menu.children.filter(child => child.roles.includes(role)) // ② 하위 메뉴 권한 확인
                    : [],
            }));
    };

    // 현재 사용자 권한에 맞는 메뉴만 남김
    const filteredMenu = filterMenuByRole(menuConfig, userRole);

    // 메뉴 렌더링 함수 (재귀적으로 자식 메뉴까지 처리)
    const renderMenu = (menu) => {
        if (menu.children && menu.children.length > 0) {
            // 자식 메뉴가 있는 경우 (예: "인사관리")
            return (
                <li key={menu.label}>
                    <span className="menu-parent">{menu.label}</span>
                    <ul className="submenu-children">
                        {menu.children.map((child) => renderMenu(child))}
                    </ul>
                </li>
            );
        }

        // 단일 메뉴 (예: "대시보드")
        return (
            <li
                key={menu.label}
                className="menu-item"
                onClick={() => navigate(menu.path)} // 클릭 시 해당 경로로 이동
                style={{ cursor: "pointer" }}
            >
                {menu.label}
            </li>
        );
    };
    // 필터링된 메뉴만 렌더링
    return (
        <aside className="submenu">
            <ul>
                {filteredMenu.map((menu) => renderMenu(menu))}
            </ul>
        </aside>
    );
}