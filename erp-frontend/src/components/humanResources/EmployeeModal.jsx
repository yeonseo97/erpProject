import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

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
    const [emp, setEmp] = useState({
      id: null,           // 수정 시 사용
      username: "",       // 계정 (필수)
      password: "",       // 등록 시 필수, 수정 시 선택
      name: "",           // 사원명
      email: "",
      phone: "",
      role: "ROLE_USER",  // 기본값
      departmentId: ""   // 선택된 부서 ID
    });

    const [departments, setDepartments] = useState([]);

    // 부서 리스트 가져오기
    const fetchDepartments = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/departments", {
        headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(res.data);
    } catch (err) {
        console.error("부서 조회 실패:", err);
    }
    };

    useEffect(() => {
    fetchDepartments();
    }, []);

    // editEmp 들어오면 state 매핑
    useEffect(() => {
        if (editEmp) {
            setEmp({
                id: editEmp.id,
                username: editEmp.username,
                password: "", // 수정 시 비워두기
                name: editEmp.name,
                email: editEmp.email,
                phone: editEmp.phone,
                role: editEmp.role,
                departmentId: editEmp.department?.id || "",
            });
        } else {
            setEmp({
                id: null,
                username: "",
                password: "",
                name: "",
                email: "",
                phone: "",
                role: "ROLE_USER",
                departmentId: "",
            });
        }
    }, [editEmp]);

    const handleChange = (e) => {
        setEmp({ ...emp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const submitData = { ...emp };
            // 수정 시 password 비워두면 제거
            if (!emp.password && editEmp) delete submitData.password;

            if (editEmp) {
            await axios.put(`/api/employees/${editEmp.id}`, submitData, {
              headers: { Authorization: `Bearer ${token}` },
            });
            } else {
            await axios.post("/api/employees", submitData, {
              headers: { Authorization: `Bearer ${token}` },
            });
            }

            refresh();
            onClose();
        } catch (err) {
            console.error("저장 실패:", err);
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
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={emp.password}
                        onChange={handleChange}
                        fullWidth
                        helperText={editEmp ? "수정 시 변경하려면 입력" : ""}
                    />
                    <TextField
                        label="사원명"
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
                    <FormControl fullWidth>
                        <InputLabel>부서</InputLabel>
                        <Select
                            name="departmentId"
                            value={emp.departmentId}
                            onChange={handleChange}
                            label="부서"
                        >
                            {departments.map((d) => (
                                <MenuItem key={d.id} value={d.id}>
                                    {d.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onClose}>
                          취소
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                          {editEmp ? "수정" : "추가"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
