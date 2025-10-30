import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EmployeeModal from "./EmployeeModal";

const EmployeeTable = () => {
    const [rows, setRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editEmp, setEditEmp] = useState(null);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/api/employees", {
                headers: { Authorization: `Bearer ${token}` } // JWT 붙이기
            });
            setRows(res.data);
        } catch (err) {
            console.error("사원 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEdit = (emp) => {
        setEditDept(emp);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchEmployees();
        } catch (err) {
            console.error("삭제 실패:", err);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "username", headerName: "계정", width: 180 },
        { field: "name", headerName: "사원명", width: 180 },
        { field: "department", headerName: "부서명", width: 180 },
        { field: "email", headerName: "이메일", width: 180 },
        { field: "phone", headerName: "전화번호", width: 180 },
        { field: "role", headerName: "권한", width: 180 },
        { field: "createdAt", headerName: "등록일자", width: 150 },
        {
            field: "actions",
            headerName: "관리",
            width: 200,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => handleEdit(params.row)}>수정</Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(params.row.id)}>삭제</Button>
                </Stack>
            ),
        },
    ];
    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={() => { setEditEmp(null); setModalOpen(true); }}>
                    직원 추가
                </Button>
            </Box>

            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    showToolbar={true}
                />
            </div>

            {modalOpen && (
                <EmployeeModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    editDept={editEmp}
                    refresh={fetchEmployees}
                />
            )}
        </Box>
    );
};

export default EmployeeTable;
