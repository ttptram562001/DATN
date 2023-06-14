package com.example.backend.api;

import com.example.backend.domain.District;
import com.example.backend.domain.Province;
import com.example.backend.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/districts")
public class DistrictResource {

    @Autowired
    private DistrictService districtService;

    @PostMapping
    public ResponseEntity<Iterable<District>> addListProvince(@RequestBody List<District> provinces ) {
        return ResponseEntity.ok().body(districtService.saveDistrict(provinces));
    }

    @GetMapping
    public ResponseEntity<List<District>> getAll() {
        return ResponseEntity.ok().body(districtService.getAll());
    }

    @GetMapping("/{code}")
    public ResponseEntity<District> getProvinceByCode(@PathVariable(name = "code") Integer code) {
        return ResponseEntity.ok().body(districtService.getByCode(code));
    }
}