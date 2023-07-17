package com.example.backend.service;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderDetail;
import com.example.backend.domain.User;
import com.example.backend.repository.OrderRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepo orderRepo;

    @Override
    public Order saveOrder(Order order) {
        log.info("dã save");
        return orderRepo.save(order);


    }

    @Override
    public Collection<OrderDetail> getOrderDetailByIdOrder(Integer idOrder) {
        Order order = orderRepo.findById(idOrder).orElse(null);
        if (order != null) {
            return order.getOrderDetails();
        }

        return null;
    }

    @Override
    public Collection<Order> getAllOrder() {
        return orderRepo.findAll();
    }

    @Override
    public Order getOrderById(Integer id) {
        log.info(orderRepo.findById(id).toString());
        return orderRepo.findById(id).orElse(null);
    }

    @Override
    public Collection<Order> findOrdersByUser(User user) {
        return orderRepo.findOrdersByUser(user);
    }
}
