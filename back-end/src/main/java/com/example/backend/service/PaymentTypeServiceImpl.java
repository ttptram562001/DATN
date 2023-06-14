package com.example.backend.service;

import com.example.backend.domain.PaymentType;
import com.example.backend.repository.PaymentTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentTypeServiceImpl implements PaymentTypeService{

    @Autowired
    private PaymentTypeRepo repo;
    @Override
    public PaymentType savePaymentType(PaymentType paymentType){
        return repo.save(paymentType);
    }

    @Override
    public PaymentType findPaymentTypeById(Integer id) {
        return repo.findById(id).orElse(null);
    }
}
