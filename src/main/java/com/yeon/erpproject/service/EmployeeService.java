package com.yeon.erpproject.service;

import com.yeon.erpproject.entity.Employee;
import com.yeon.erpproject.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("사원을 찾을 수 없습니다."));
    }

    public Employee save(Employee emp) {
        return employeeRepository.save(emp);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }
}

