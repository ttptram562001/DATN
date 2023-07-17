package com.example.backend.service;

import com.example.backend.domain.AddressType;
import com.example.backend.repository.AddressTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AddressTypeServiceImpl implements AddressTypeService{

    @Autowired
    private  AddressTypeRepo repo;

    @Override
    public AddressType save(AddressType addressType) {
        return repo.save(addressType);
    }

    @Override
    public Collection<AddressType> getAll() {
        return repo.findAll();
    }

    @Override
    public AddressType getAddressTypeById(int id) {
        return repo.findById(id).orElse(null);
    }
}
