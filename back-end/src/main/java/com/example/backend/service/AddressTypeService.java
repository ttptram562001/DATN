package com.example.backend.service;

import com.example.backend.domain.AddressType;

import java.util.Collection;

public interface AddressTypeService {
    AddressType save(AddressType addressType);
    Collection<AddressType> getAll();
    AddressType getAddressTypeById(int id);
}
