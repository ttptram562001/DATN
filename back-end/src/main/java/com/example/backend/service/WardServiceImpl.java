package com.example.backend.service;

import com.example.backend.domain.Ward;
import com.example.backend.repository.WardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardServiceImpl implements WardService{
    @Autowired
    private WardRepo wardRepo;
    @Override
    public List<Ward> saveListWard(List<Ward> wards) {
        return wardRepo.saveAll(wards);
    }

    @Override
    public List<Ward> getAll() {
        return wardRepo.findAll();
    }

}
