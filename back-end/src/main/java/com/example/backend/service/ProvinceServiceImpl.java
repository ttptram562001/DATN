package com.example.backend.service;

import com.example.backend.domain.Province;
import com.example.backend.repository.DistrictRepo;
import com.example.backend.repository.ProvinceRepo;
import com.example.backend.repository.WardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private  ProvinceRepo provinceRepo;

    @Autowired
    private DistrictRepo districtRepo;

    @Autowired
    private WardRepo wardRepo;

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

    @Override
    public String getAddress(int codeProvince, int codeDistrict, int codeWard) {
        String province = provinceRepo.findByCode(codeProvince).orElse(null).getName();
        String district = districtRepo.findByCode(codeDistrict).orElse(null).getName();
        String ward = wardRepo.findByCode(codeWard).orElse(null).getName();
        return ward+ "," + district+ "," + province;
    }
}
