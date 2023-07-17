package com.example.backend.api;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderStatus;
import com.example.backend.dto.OrderStatisticDTO;
import com.example.backend.dto.Reveneu;
import com.example.backend.service.StatisticService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;


@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/statistic")
public class StatisticResource {
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/get-total-user")
    public ResponseEntity<Integer> getTotalUser() {
        return ResponseEntity.ok().body(statisticService.getTotalUser());
    }

    @GetMapping("/get-total-order")
    public ResponseEntity<Integer> getTotalOrder() {
        return ResponseEntity.ok().body(statisticService.getTotalOrder());
    }

    @GetMapping("/get-earning")
    public ResponseEntity<Float> getEarning() {
        return ResponseEntity.ok().body(statisticService.getTotalEarning());
    }

    @GetMapping("/get-earning-today")
    public ResponseEntity<Float> getEarningToday() {
        return ResponseEntity.ok().body(statisticService.getTotalEarningToday());
    }

    @GetMapping
    public ResponseEntity<ArrayList<Reveneu>> getRevenue() {
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/get-order-between-days")
    public ResponseEntity<List<OrderStatisticDTO>> getOrderBetweenDays(@RequestParam(name = "startDate") String start,
                                                                     @RequestParam(name = "endDate") String end) throws ParseException {
        Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(start);
        Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(end);
        Date tomorrow = new Date(endDate.getTime() + (1000 * 60 * 60 * 24));
        List<OrderStatisticDTO> list = new ArrayList<>();
        List<Order> orders = statisticService.getOrderBetweenDays(startDate, tomorrow).orElse(null);
        if (orders != null) {
            orders.forEach(order -> {
                order.getOrderDetails().forEach(orderDetail -> {
                    OrderStatisticDTO dto = new OrderStatisticDTO(order.getId(),
                            orderDetail.getBook().getId(),
                            orderDetail.getBook().getTitle(),
                            order.getCreatedAt(),
                            orderDetail.getAmount(),
                            orderDetail.getBook().getPrice(),
                            orderDetail.getAmount()*orderDetail.getBook().getPrice());
                    list.add(dto);
                });

            });
        }
        return ResponseEntity.ok().body(list);
    }
}
