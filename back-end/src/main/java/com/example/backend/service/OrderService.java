package com.example.backend.service;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderDetail;
import com.example.backend.domain.User;

import java.util.Collection;
import java.util.List;

public interface OrderService {
    Order saveOrder(Order order);
    Collection<OrderDetail> getOrderDetailByIdOrder(Integer idOrder);
    Collection<Order> getAllOrder();
    Order getOrderById(Integer id);
    Collection<Order> findOrdersByUser(User user);
}
