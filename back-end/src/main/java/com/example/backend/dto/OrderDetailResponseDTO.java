package com.example.backend.dto;

import com.example.backend.domain.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponseDTO {
    private ArrayList<OrderDetailCustom> orderDetailDTOS= new ArrayList<>();
    private String address;
    private String paymentType;
    private OrderStatus currentStatus;
    private float totalPrices;

}
