package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatisticDTO {
    private int orderCode;
    private int bookCode;
    private String bookName;
    private Date createdAt;
    private int amount;
    private float pricePerUnit;
    private float totalPrice;
}
