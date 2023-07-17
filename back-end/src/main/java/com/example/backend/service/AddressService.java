package com.example.backend.service;

import com.example.backend.domain.Address;


public interface AddressService {
    Address save(Address address);
    Address getAddressDefault();
}
