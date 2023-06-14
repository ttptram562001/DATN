package com.example.backend.repository;

import com.example.backend.domain.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardRepo extends JpaRepository<Ward, Integer> {
}
