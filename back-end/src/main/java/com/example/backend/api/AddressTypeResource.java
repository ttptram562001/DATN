package com.example.backend.api;


import com.example.backend.domain.AddressType;
import com.example.backend.service.AddressTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@Slf4j
@CrossOrigin()
@RequestMapping("/api/address-types")
public class AddressTypeResource {

    @Autowired
    private AddressTypeService service;

    @GetMapping
    public ResponseEntity<Collection<AddressType>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<AddressType> save(@RequestParam(name = "name") String name) {
        AddressType addressType = new AddressType(name);
        return ResponseEntity.ok().body(service.save(addressType));
    }

}
