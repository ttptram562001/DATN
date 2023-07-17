package com.example.backend.repository;

import com.example.backend.domain.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface OrderStatusRepo extends JpaRepository<OrderStatus, Integer> {
    Optional<OrderStatus> findByName(String name);
}
