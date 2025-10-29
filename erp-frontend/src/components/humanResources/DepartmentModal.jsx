import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";
import axios from "axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    borderRadius: 2,
    boxShadow: 3,
    p: 4,
};

export default function DepartmentModal({ open, onClose, editDept, refresh }) {
    const [dept, setDept] = useState({ name: "", manager: "" });

    useEffect(() => {
        if (editDept) setDept(editDept);
        else setDept({ name: "", manager: "" });
    }, [editDept]);

    const handleChange = (e) => {
        setDept({ ...dept, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (editDept) {
                await axios.put(`/api/departments/${editDept.id}`, dept);
            } else {
                await axios.post("/api/departments", dept);
            }
            refresh();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Stack spacing={2}>
                    <TextField
                        label="부서명"
                        name="name"
                        value={dept.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="관리자"
                        name="manager"
                        value={dept.manager}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onClose}>취소</Button>
                        <Button variant="contained" onClick={handleSubmit}>{editDept ? "수정" : "추가"}</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
