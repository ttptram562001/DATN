package com.example.backend.dto;

import com.example.backend.domain.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private int id;
    private float bookPrices;
    private String paymentTypeName;
    private String username;
    private String address;
    private Date createdAt;
    private String status;
}
