package com.example.backend.service;

import com.example.backend.domain.Rate;

public interface RateService {
    Rate addRate(Rate rate);
    Rate updateRate(Rate rate, int amount);
    Rate getRate(Integer idUser, Integer idBook);
}
