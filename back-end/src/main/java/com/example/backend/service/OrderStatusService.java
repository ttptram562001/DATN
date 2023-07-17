package com.example.backend.service;

import com.example.backend.domain.OrderStatus;

public interface OrderStatusService {
    OrderStatus save(String name);
    OrderStatus getOrderStatusByName(String name);
    OrderStatus getOderStatusById(Integer id);
}
