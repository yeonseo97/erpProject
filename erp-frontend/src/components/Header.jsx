import { Layout } from "antd";

const { Header } = Layout;

export default function AppHeader() {
    return (
        <Header style={{ background: "#1890ff", color: "white", padding: "0 20px" }}>
            ERP System
        </Header>
    );
}
