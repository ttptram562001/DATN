package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private String name;
    private String phone;
    private String detailAddress;
    private String address;
    private int idAddressType;
    private boolean defaultAddress;
}
