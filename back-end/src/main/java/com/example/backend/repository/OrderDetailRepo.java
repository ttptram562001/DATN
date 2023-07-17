package com.example.backend.repository;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface OrderDetailRepo extends JpaRepository<OrderDetail, Integer> {
    Collection<OrderDetail> findByOrder(Order order);
}
