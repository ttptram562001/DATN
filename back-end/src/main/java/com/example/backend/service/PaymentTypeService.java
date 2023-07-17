package com.example.backend.service;

import com.example.backend.domain.PaymentType;
import org.springframework.stereotype.Service;

public interface PaymentTypeService {
    PaymentType savePaymentType(PaymentType paymentType);
    PaymentType findPaymentTypeById(Integer id);
}
