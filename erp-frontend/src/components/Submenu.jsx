import { Menu } from "antd";

export default function Submenu({ items, selectedKey, onSelect }) {
    return (
        <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => onSelect(e.key)}
            items={items}
            style={{ height: "100%", borderRight: 0, background: "#fff" }}
        />
    );
}
