package com.example.backend.repository;

import com.example.backend.domain.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentTypeRepo extends JpaRepository<PaymentType, Integer> {
}
