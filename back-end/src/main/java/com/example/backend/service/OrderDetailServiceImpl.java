package com.example.backend.service;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderDetail;
import com.example.backend.repository.OrderDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        return orderDetailRepo.save(orderDetail);
    }

    @Override
    public OrderDetail getById(Integer id) {
        return orderDetailRepo.findById(id).orElse(null);
    }

}
