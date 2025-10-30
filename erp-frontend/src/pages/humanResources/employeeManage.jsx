import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import EmployeeTable from "../../components/humanResources/EmployeeTable";

const EmployeeManage = () => {
    const [tabValue, setTabValue] = useState(0);

    return (
        <Box sx={{ background: "#fff", borderRadius: 2, p: 3, boxShadow: 3 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 2 }}>
                <Tab label="사원 목록" />
            </Tabs>

            {tabValue === 0 && <EmployeeTable />}
        </Box>
    );
};

export default EmployeeManage;