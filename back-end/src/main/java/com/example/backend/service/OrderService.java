package com.example.backend.service;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderDetail;

import java.util.List;

public interface OrderService {
    Order saveOrder(Order order);
    List<OrderDetail> getALlOrderDetail(Integer idOrder);
}
