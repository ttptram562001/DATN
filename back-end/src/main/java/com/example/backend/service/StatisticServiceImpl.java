package com.example.backend.service;

import com.example.backend.domain.Order;
import com.example.backend.repository.OrderRepo;
import com.example.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private OrderRepo orderRepo;
    @Override
    public Integer getTotalUser() {
        return userRepo.getNumbersUser();
    }

    @Override
    public Integer getTotalOrder() {
        return orderRepo.getNumberOrder();
    }

    @Override
    public Float getTotalEarning() {
        return orderRepo.getTotalEarning();
    }

    @Override
    public Float getTotalEarningToday() {
        return orderRepo.getTotalEarningToday();
    }

    @Override
    public Optional<List<Order>> getOrderBetweenDays(Date startDate, Date endDate) {
        return orderRepo.GetOrderBetweenDays(startDate, endDate);
    }
}
