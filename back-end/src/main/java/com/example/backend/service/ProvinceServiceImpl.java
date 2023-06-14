package com.example.backend.service;

import com.example.backend.domain.Province;
import com.example.backend.repository.ProvinceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private  ProvinceRepo provinceRepo;

    @Override
    public List<Province> saveListProvice(List<Province> provinces) {
        return provinceRepo.saveAll(provinces);
    }

    @Override
    public List<Province> getAll() {
        return provinceRepo.findAll();
    }

    @Override
    public Province getByCode(Integer code) {
        return provinceRepo.findByCode(code).orElse(null);
    }
}
