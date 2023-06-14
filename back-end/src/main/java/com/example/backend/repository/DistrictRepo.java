package com.example.backend.repository;

import com.example.backend.domain.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistrictRepo extends JpaRepository<District, Integer> {
    Optional<District> findByCode(Integer code);
}
