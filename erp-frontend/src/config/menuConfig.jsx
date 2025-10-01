const menuConfig = [
    {
        label: "📊 대시보드",
        path: "/dashboard",
        roles: ["USER", "ADMIN"],
    },
    {
        label: "👤 인사관리",
        roles: ["ADMIN"],
        children: [
            { label: "부서관리", path: "/humanResources/departmentManage", roles: ["ADMIN"] },
            { label: "직원관리", path: "/humanResources/employeeManage", roles: ["ADMIN"] },
        ],
    },
    {
        label: "🏭 생산관리",
        roles: ["USER", "ADMIN"],
        children: [
            { label: "BOM 관리", path: "/manufacturing/bomManage", roles: ["USER", "ADMIN"] },
        ],
    },
];

export default menuConfig;