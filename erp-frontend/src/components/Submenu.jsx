import { useNavigate } from "react-router-dom";
import menuConfig from "../config/menuConfig";

export default function Submenu() {
    const navigate = useNavigate();

    const renderMenu = (menu) => {
        if (menu.children) {
            return (
                <li key={menu.label}>
                    <span className="menu-parent">{menu.label}</span>
                    <ul className="submenu-children">
                        {menu.children.map((child) => renderMenu(child))}
                    </ul>
                </li>
            );
        }
        return (
            <li key={menu.label} className="menu-item" onClick={() => navigate(menu.path)}>
                {menu.label}
            </li>
        );
    };

    return (
        <aside className="submenu">
            <ul>
                {menuConfig.map((menu) => renderMenu(menu))}
            </ul>
        </aside>
    );
}