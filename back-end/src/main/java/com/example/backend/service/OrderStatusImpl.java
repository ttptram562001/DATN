package com.example.backend.service;

import com.example.backend.domain.OrderStatus;
import com.example.backend.repository.OrderStatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OrderStatusImpl implements OrderStatusService{
    @Autowired
    private OrderStatusRepo repo;
    @Override
    public OrderStatus save(String name) {
        OrderStatus orderStatus = new OrderStatus(null, name);
        return repo.save(orderStatus);
    }

    @Override
    public OrderStatus getOrderStatusByName(String name) {
        return repo.findByName(name).orElse(null);
    }

    @Override
    public OrderStatus getOderStatusById(Integer id) {
        return repo.findById(id).orElse(null);
    }
}
