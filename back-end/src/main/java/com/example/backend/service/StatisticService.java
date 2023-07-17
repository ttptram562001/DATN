package com.example.backend.service;

import com.example.backend.domain.Order;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface StatisticService {
    Integer getTotalUser();
    Integer getTotalOrder();
    Float getTotalEarning();
    Float getTotalEarningToday();
    Optional<List<Order>> getOrderBetweenDays(Date startDate, Date endDate);
}
