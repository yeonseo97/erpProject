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
    public List<Department> getAll() {
        return departmentService.findAll();
    }

    @PostMapping
    public Department create(@RequestBody Department dept) {
        return departmentService.save(dept);
    }

    @PutMapping("/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department dept) {
        dept.setId(id);
        return departmentService.save(dept);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        departmentService.delete(id);
    }
}

