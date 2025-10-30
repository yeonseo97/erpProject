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

export default function EmployeeModal({ open, onClose, editEmp, refresh }) {
    const [emp, setEmp] = useState({ name: "", department: "" });

    useEffect(() => {
        if (editEmp) setEmp(editEmp);
        else setEmp({ name: "", department: "" });
    }, [editEmp]);

    const handleChange = (e) => {
        setEmp({ ...emp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (editEmp) {
                await axios.put(`/api/employees/${editEmp.id}`, emp);
            } else {
                await axios.post("/api/employees", emp);
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
                        label="계정"
                        name="username"
                        value={emp.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="직원명"
                        name="name"
                        value={emp.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="이메일"
                        name="email"
                        value={emp.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="전화번호"
                        name="phone"
                        value={emp.phone}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="부서명"
                        name="department"
                        value={emp.department}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onClose}>취소</Button>
                        <Button variant="contained" onClick={handleSubmit}>{editEmp ? "수정" : "추가"}</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
