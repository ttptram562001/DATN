package com.example.backend.service;

import com.example.backend.domain.Rate;
import com.example.backend.repository.RateRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RateServiceImpl implements RateService{
    @Autowired
    private  RateRepo rateRepo;

    @Override
    public Rate addRate(Rate rate) {
        return rateRepo.save(rate);
    }

    @Override
    public Rate updateRate(Rate rate, int amount) {
        rate.setAmount(amount);
        rate.setUpdatedAt(new Date());
        return rateRepo.save(rate);
    }

    @Override
    public Rate getRate(Integer idUser, Integer idBook) {
        return rateRepo.findByUser_idAndBook_id(idUser, idBook).orElse(null);
    }
}
