import { useState } from "react";
import { Layout as AntLayout } from "antd";
import Header from "./Header";
import Tabs, { TabPane } from "./Tabs";
import Submenu from "./Submenu";
import Detail1 from "../pages/humanResources/departmentManage";
import Detail2 from "../pages/manufacturing/bomManage";

const { Content, Sider } = AntLayout;

export default function Layout() {
    const [activeTab, setActiveTab] = useState("tab1");
    const [activeSubmenu, setActiveSubmenu] = useState("detail1");

    const tab1MenuItems = [
        { key: "detail1", label: "Detail 1" },
        { key: "detail2", label: "Detail 2" },
    ];

    const renderContent = () => {
        if (activeTab === "tab1") {
            if (activeSubmenu === "detail1") return <Detail1 />;
            if (activeSubmenu === "detail2") return <Detail2 />;
        }
        if (activeTab === "tab2") return <div>Tab 2 Content</div>;
        if (activeTab === "tab3") return <div>Tab 3 Content</div>;
        return <div>Select a submenu</div>;
    };

    return (
        <AntLayout style={{ minHeight: "100vh" }}>
            <Header />
            <Tabs activeKey={activeTab} onChange={(key) => { setActiveTab(key); setActiveSubmenu("detail1"); }}>
                <TabPane tab="Tab 1" key="tab1" />
                <TabPane tab="Tab 2" key="tab2" />
                <TabPane tab="Tab 3" key="tab3" />
            </Tabs>
            <AntLayout>
                <Sider width={200}>
                    {activeTab === "tab1" && (
                        <Submenu
                            items={tab1MenuItems}
                            selectedKey={activeSubmenu}
                            onSelect={setActiveSubmenu}
                        />
                    )}
                </Sider>
                <Content style={{ padding: "20px", background: "#fff" }}>
                    {renderContent()}
                </Content>
            </AntLayout>
        </AntLayout>
    );
}
