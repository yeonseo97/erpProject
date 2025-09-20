package com.yeon.erpproject.service;

import com.yeon.erpproject.entity.Department;
import com.yeon.erpproject.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<Department> findAll() {
        return departmentRepository.findAll();
    }

    public Department save(Department dept) {
        return departmentRepository.save(dept);
    }

    public void delete(Long id) {
        departmentRepository.deleteById(id);
    }
}
