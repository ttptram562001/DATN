package com.example.backend.service;

import com.example.backend.domain.District;
import com.example.backend.repository.DistrictRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService{
    @Autowired
    private DistrictRepo districtRepo;

    @Override
    public List<District> saveDistrict(List<District> districts) {
        return districtRepo.saveAll(districts);
    }

    @Override
    public List<District> getAll() {
        return districtRepo.findAll();
    }

    @Override
    public District getByCode(Integer code) {
        return districtRepo.findByCode(code).orElse(null);
    }
}
