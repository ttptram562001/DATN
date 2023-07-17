package com.example.backend.api;

import com.example.backend.domain.Ward;
import com.example.backend.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wards")
@CrossOrigin()
public class WardResource {
    @Autowired
    private WardService wardService;

    @PostMapping
    public ResponseEntity<Iterable<Ward>> addListProvince(@RequestBody List<Ward> wards ) {
        return ResponseEntity.ok().body(wardService.saveListWard(wards));
    }

    @GetMapping
    public ResponseEntity<List<Ward>> getAll() {
        return ResponseEntity.ok().body(wardService.getAll());
    }
}
