package com.example.backend.service;

import com.example.backend.domain.Address;
import com.example.backend.repository.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressRepo addressRepo;

    @Override
    public Address save(Address address) {
        return addressRepo.save(address);
    }

    @Override
    public Address getAddressDefault() {
        return null;
    }

}
