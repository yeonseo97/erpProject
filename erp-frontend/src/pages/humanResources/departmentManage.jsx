import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import DepartmentTable from "../../components/humanResources/DepartmentTable";

const DepartmentManage = () => {
    const [tabValue, setTabValue] = useState(0);

    return (
        <Box sx={{ background: "#fff", borderRadius: 2, p: 3, boxShadow: 3 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 2 }}>
                <Tab label="부서 목록" />
                {/* 나중에 <Tab label="조직도 보기" /> 추가 가능 */}
            </Tabs>

            {tabValue === 0 && <DepartmentTable />}
        </Box>
    );
};

export default DepartmentManage;
