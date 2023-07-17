package com.example.backend.service;

import com.example.backend.domain.Province;

import java.util.List;

public interface ProvinceService {
    List<Province> saveListProvice(List<Province> provinces);
    List<Province> getAll();
    Province getByCode(Integer code);
    String getAddress(int codeProvince, int codeDistrict, int codeWard);
}
