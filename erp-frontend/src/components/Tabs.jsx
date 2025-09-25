import { Tabs as AntTabs } from "antd";

const { TabPane } = AntTabs;

export default function Tabs({ activeKey, onChange, children }) {
    return (
        <AntTabs
            activeKey={activeKey}
            onChange={onChange}
            style={{ padding: "0 20px", background: "#f0f2f5" }}
        >
            {children}
        </AntTabs>
    );
}

export { TabPane };

