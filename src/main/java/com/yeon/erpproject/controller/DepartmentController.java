package com.yeon.erpproject.controller;

import com.yeon.erpproject.entity.Department;
import com.yeon.erpproject.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public List<Department> findAll() {
        return departmentService.findAll();
    }

    @PostMapping
    public Department save(@RequestBody Department dept) {
        return departmentService.save(dept);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        departmentService.delete(id);
    }
}

