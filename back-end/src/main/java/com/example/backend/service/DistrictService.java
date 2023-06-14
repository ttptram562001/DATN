package com.example.backend.service;

import com.example.backend.domain.District;

import java.util.List;

public interface DistrictService {
    List<District> saveDistrict(List<District> districts);
    List<District> getAll();
    District getByCode(Integer code);
}
