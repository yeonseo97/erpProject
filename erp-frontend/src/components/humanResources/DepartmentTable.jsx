import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DepartmentModal from "./DepartmentModal";

const DepartmentTable = () => {
    const [rows, setRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editDept, setEditDept] = useState(null);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/api/departments", {
                headers: { Authorization: `Bearer ${token}` } // JWT 붙이기
            });
            setRows(res.data);
        } catch (err) {
            console.error("부서 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleEdit = (dept) => {
        setEditDept(dept);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/departments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDepartments();
        } catch (err) {
            console.error("삭제 실패:", err);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "부서명", width: 180 },
        { field: "manager", headerName: "관리자", width: 150 },
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
                <Button variant="contained" color="primary" onClick={() => { setEditDept(null); setModalOpen(true); }}>
                    부서 추가
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
                <DepartmentModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    editDept={editDept}
                    refresh={fetchDepartments}
                />
            )}
        </Box>
    );
};

export default DepartmentTable;
