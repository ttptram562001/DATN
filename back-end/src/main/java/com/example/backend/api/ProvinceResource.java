package com.example.backend.api;

import com.example.backend.domain.Province;
import com.example.backend.repository.ProvinceRepo;
import com.example.backend.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/provinces")
public class ProvinceResource {
    @Autowired
    private  ProvinceService provinceService;

    @PostMapping
    public ResponseEntity<Iterable<Province>> addListProvince(@RequestBody List<Province> provinces ) {
        return ResponseEntity.ok().body(provinceService.saveListProvice(provinces));
    }

    @GetMapping
    public ResponseEntity<List<Province>> getProvinces() {
        return ResponseEntity.ok().body(provinceService.getAll());
    }

    @GetMapping("/{code}")
    public ResponseEntity<Province> getProvinceByCode(@PathVariable(name = "code") Integer code) {
        return ResponseEntity.ok().body(provinceService.getByCode(code));
    }
}
