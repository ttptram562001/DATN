package com.example.backend.service;

import com.example.backend.domain.PaymentType;

public interface PaymentTypeService {
    PaymentType savePaymentType(PaymentType paymentType);
    PaymentType findPaymentTypeById(Integer id);
}
