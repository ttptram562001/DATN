package com.example.backend.service;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderDetail;
import com.example.backend.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepo orderRepo;

    @Override
    public Order saveOrder(Order order) {
        return orderRepo.save(order);
    }

    @Override
    public List<OrderDetail> getALlOrderDetail(Integer idOrder) {
        Order order = orderRepo.findById(idOrder).orElse(null);
        if (order != null)
            return (List<OrderDetail>) order.getOrderDetails();
        return null;
    }
}
