package com.example.backend.repository;

import com.example.backend.domain.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProvinceRepo extends JpaRepository<Province, Integer> {
    Optional<Province> findByCode(Integer code);
}
