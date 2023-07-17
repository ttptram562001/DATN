package com.example.backend.api;

import com.example.backend.domain.Account;
import com.example.backend.domain.Address;
import com.example.backend.domain.AddressType;
import com.example.backend.dto.AddressDTO;
import com.example.backend.service.AccountService;
import com.example.backend.service.AddressService;
import com.example.backend.service.AddressTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin()
@RequestMapping("/api/addresses")
public class AddressResource {

    @Autowired
    private AddressService addressService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AddressTypeService addressTypeService;

    @PostMapping("/{idAccount}")
    public ResponseEntity<Address> save(@PathVariable(name = "idAccount") int idAccount,
                                        @RequestBody AddressDTO addressDTO) {
        Account account = accountService.getAccountById(idAccount);
        AddressType addressType = addressTypeService.getAddressTypeById(addressDTO.getIdAddressType());
        Address newAddress = new Address(addressDTO.getName(), addressDTO.getPhone(), addressDTO.getDetailAddress(), addressDTO.getAddress(), addressDTO.isDefaultAddress(), addressType, account);
        account.getAddresses().add(newAddress);
        accountService.saveAccount(account);
        return ResponseEntity.ok().body(addressService.save(newAddress));
    }
}
