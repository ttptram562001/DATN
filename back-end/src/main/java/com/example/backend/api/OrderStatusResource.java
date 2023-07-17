package com.example.backend.api;

import com.example.backend.domain.OrderStatus;
import com.example.backend.service.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order-status")
@CrossOrigin()
public class OrderStatusResource {

    @Autowired
    private OrderStatusService orderStatusService;

    @PostMapping
    public ResponseEntity<OrderStatus> saveOrderStatus(@RequestParam(name = "name") String name) {
        return ResponseEntity.ok().body(orderStatusService.save(name));
    }
}
